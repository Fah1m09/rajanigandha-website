// Client + server-side tracking for Google (GA4 / Google Ads) and Meta (Pixel / Conversions API).
//
// Browser side: gtag.js and the Meta Pixel load only when their IDs are set (NEXT_PUBLIC_* env vars).
// Server side: every event is also posted to /.netlify/functions/track, which forwards it to
// Meta's Conversions API (deduplicated with the Pixel via a shared event_id) and, only when
// gtag.js was blocked in the browser, to GA4's Measurement Protocol so GA4 never counts twice.

type Params = Record<string, unknown>;
type UserData = { email?: string; phone?: string; name?: string };

type Gtag = (...args: unknown[]) => void;
type Fbq = ((...args: unknown[]) => void) & { callMethod?: Fbq; queue?: unknown[]; loaded?: boolean; version?: string; push?: Fbq };

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

// Next only inlines NEXT_PUBLIC_* values when each one is written out in full like this.
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || undefined;
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || undefined;
const ADS_LEAD_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL || undefined;
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || undefined;
const SERVER_ENDPOINT = process.env.NEXT_PUBLIC_TRACKING_ENDPOINT || "/.netlify/functions/track";
// Server-side tracking runs only in production builds unless explicitly turned on.
const SERVER_ENABLED =
  (process.env.NEXT_PUBLIC_SERVER_TRACKING || (process.env.NODE_ENV === "production" ? "true" : "false")) === "true";

let started = false;
let gtagReady = false;

// GA4 event name -> Meta standard event name
const META_EVENTS: Record<string, string> = {
  page_view: "PageView",
  view_item: "ViewContent",
  generate_lead: "Lead",
  contact: "Contact",
  request_quote: "InitiateCheckout",
  file_download: "ViewContent",
};

function loadScript(src: string, onLoad?: () => void) {
  const script = document.createElement("script");
  script.async = true;
  script.src = src;
  if (onLoad) script.onload = onLoad;
  document.head.appendChild(script);
}

function startGoogle() {
  const firstId = GA_ID || ADS_ID;
  if (!firstId) return;
  window.dataLayer = window.dataLayer || [];
  // gtag must push the `arguments` object, not an array
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  // Page views are sent manually on every route change (this is a single-page app).
  if (GA_ID) window.gtag("config", GA_ID, { send_page_view: false });
  if (ADS_ID) window.gtag("config", ADS_ID);
  loadScript(`https://www.googletagmanager.com/gtag/js?id=${firstId}`, () => { gtagReady = true; });
}

function startMeta() {
  if (!PIXEL_ID || window.fbq) return;
  const fbq: Fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue!.push(args);
  };
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;
  window._fbq = fbq;
  loadScript("https://connect.facebook.net/en_US/fbevents.js");
  window.fbq("init", PIXEL_ID);
}

/** Loads the tags once. Safe to call when no IDs are configured; then it does nothing. */
export function initAnalytics() {
  if (started || typeof window === "undefined") return;
  started = true;
  startGoogle();
  startMeta();
  document.addEventListener("click", trackLinkClicks, { capture: true });
}

function newEventId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function readCookie(name: string) {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

// GA4 client id from the _ga cookie ("GA1.1.<id>.<timestamp>"), or a stable fallback id.
function gaClientId() {
  const ga = readCookie("_ga");
  if (ga) return ga.split(".").slice(-2).join(".");
  try {
    let id = localStorage.getItem("ri_cid");
    if (!id) {
      id = `${Math.floor(Math.random() * 1e10)}.${Math.floor(Date.now() / 1000)}`;
      localStorage.setItem("ri_cid", id);
    }
    return id;
  } catch {
    return `${Math.floor(Math.random() * 1e10)}.${Math.floor(Date.now() / 1000)}`;
  }
}

// Meta click id: use the Pixel's _fbc cookie, or build one from ?fbclid= when the Pixel is blocked.
function metaClickId() {
  const cookie = readCookie("_fbc");
  if (cookie) return cookie;
  const fbclid = new URLSearchParams(window.location.search).get("fbclid");
  return fbclid ? `fb.1.${Date.now()}.${fbclid}` : undefined;
}

function sendToServer(name: string, eventId: string, params: Params, user?: UserData) {
  if (!SERVER_ENABLED) return;
  const body = JSON.stringify({
    event_name: name,
    meta_event_name: META_EVENTS[name],
    event_id: eventId,
    event_source_url: window.location.href,
    page_title: document.title,
    referrer: document.referrer || undefined,
    params,
    user,
    ga_client_id: gaClientId(),
    // Only ask the server to hit GA4 when the browser tag didn't load (e.g. ad blockers).
    send_ga: Boolean(GA_ID) && !gtagReady,
    fbp: readCookie("_fbp"),
    fbc: metaClickId(),
  });
  // keepalive lets the request finish even if the user navigates away (e.g. tel: links)
  fetch(SERVER_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => undefined);
}

/**
 * Sends one event to GA4, Meta Pixel and the server endpoint.
 * `name` is a GA4 event name; it is mapped to a Meta standard event where one exists.
 * `user` (email/phone) is only sent to our own server, where it is hashed before reaching Meta.
 */
export function track(name: string, params: Params = {}, user?: UserData) {
  if (typeof window === "undefined") return;
  // Child effects (e.g. view_item on a product page) can run before the layout's tracker on first load.
  initAnalytics();
  const eventId = newEventId();

  window.gtag?.("event", name, { ...params, ...(GA_ID ? { send_to: GA_ID } : {}) });

  const metaName = META_EVENTS[name];
  if (window.fbq) {
    if (metaName) window.fbq("track", metaName, params, { eventID: eventId });
    else window.fbq("trackCustom", name, params, { eventID: eventId });
  }

  sendToServer(name, eventId, params, user);
}

export function trackPageView(path: string) {
  track("page_view", { page_path: path, page_location: window.location.href, page_title: document.title });
}

export function trackLead(params: Params, user: UserData) {
  track("generate_lead", params, user);
  if (ADS_ID && ADS_LEAD_LABEL) window.gtag?.("event", "conversion", { send_to: `${ADS_ID}/${ADS_LEAD_LABEL}` });
}

// One listener covers every phone, email, brochure and quote link on the site.
function trackLinkClicks(event: MouseEvent) {
  const link = (event.target as Element | null)?.closest?.("a");
  if (!link) return;
  const href = link.getAttribute("href") ?? "";

  if (href.startsWith("tel:")) track("contact", { method: "phone", link_url: href });
  else if (href.startsWith("mailto:")) track("contact", { method: "email", link_url: href });
  else if (/\.pdf($|\?)/i.test(href)) {
    track("file_download", { file_name: href.split("/").pop(), file_extension: "pdf", link_url: href });
  } else if (href.startsWith("/contact?subject=")) {
    const subject = new URLSearchParams(href.split("?")[1]).get("subject") ?? "";
    track("request_quote", { content_name: subject.replace(/^Quote request:\s*/i, "") });
  }
}
