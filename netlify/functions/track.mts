// Server-side tracking endpoint: POST /.netlify/functions/track
//
// Receives events from src/services/analytics.ts and forwards them to:
//  - Meta Conversions API (always, when configured). Shares event_id with the browser Pixel so
//    Meta deduplicates the pair.
//  - GA4 Measurement Protocol (only when the browser says gtag.js was blocked, so GA4 never
//    receives the same event twice).
//
// Configure in Netlify > Site configuration > Environment variables (see .env.example).
import { createHash } from "node:crypto";

type Incoming = {
  event_name?: string;
  meta_event_name?: string;
  event_id?: string;
  event_source_url?: string;
  page_title?: string;
  referrer?: string;
  params?: Record<string, unknown>;
  user?: { email?: string; phone?: string; name?: string };
  ga_client_id?: string;
  send_ga?: boolean;
  fbp?: string;
  fbc?: string;
};

const ALLOWED_EVENTS = new Set(["page_view", "view_item", "generate_lead", "contact", "request_quote", "file_download"]);

const env = (key: string) => process.env[key]?.trim() || undefined;

const sha256 = (value: string) => createHash("sha256").update(value).digest("hex");

function normalizePhone(phone: string) {
  let digits = phone.replace(/\D/g, "");
  const country = env("DEFAULT_PHONE_COUNTRY_CODE") ?? "880";
  // Local numbers ("01712…") get the country code; "00880…" loses its international prefix.
  if (digits.startsWith("00")) digits = digits.slice(2);
  else if (digits.startsWith("0")) digits = country + digits.slice(1);
  return digits;
}

function json(status: number, body: unknown) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
}

function originAllowed(req: Request) {
  const allowed = env("TRACKING_ALLOWED_ORIGINS");
  if (!allowed) return true;
  const origin = req.headers.get("origin");
  return !origin || allowed.split(",").map((item) => item.trim()).includes(origin);
}

// Keep only flat values Meta accepts in custom_data (drops GA-only keys like `items`).
function metaCustomData(params: Record<string, unknown> = {}) {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(params)) {
    if (key === "items" || key.startsWith("page_")) continue;
    if (["string", "number", "boolean"].includes(typeof value) || Array.isArray(value)) out[key] = value;
  }
  return out;
}

async function sendToMeta(event: Incoming, req: Request) {
  const pixelId = env("META_PIXEL_ID");
  const token = env("META_CAPI_ACCESS_TOKEN");
  if (!pixelId || !token) return "skipped";

  const ip = req.headers.get("x-nf-client-connection-ip") ?? req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const userData: Record<string, unknown> = {
    client_ip_address: ip,
    client_user_agent: req.headers.get("user-agent") ?? undefined,
    fbp: event.fbp,
    fbc: event.fbc,
    external_id: event.ga_client_id ? [sha256(event.ga_client_id)] : undefined,
  };
  if (event.user?.email) userData.em = [sha256(event.user.email.trim().toLowerCase())];
  if (event.user?.phone) userData.ph = [sha256(normalizePhone(event.user.phone))];
  if (event.user?.name) {
    const [first, ...rest] = event.user.name.trim().toLowerCase().split(/\s+/);
    if (first) userData.fn = [sha256(first)];
    if (rest.length) userData.ln = [sha256(rest[rest.length - 1])];
  }

  const payload: Record<string, unknown> = {
    data: [{
      event_name: event.meta_event_name ?? event.event_name,
      event_time: Math.floor(Date.now() / 1000),
      event_id: event.event_id,
      event_source_url: event.event_source_url,
      action_source: "website",
      user_data: userData,
      custom_data: metaCustomData(event.params),
    }],
  };
  const testCode = env("META_TEST_EVENT_CODE");
  if (testCode) payload.test_event_code = testCode;

  const version = env("META_API_VERSION") ?? "v23.0";
  const res = await fetch(`https://graph.facebook.com/${version}/${pixelId}/events?access_token=${encodeURIComponent(token)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) console.error("Meta CAPI error", res.status, await res.text());
  return res.ok ? "sent" : "failed";
}

async function sendToGa(event: Incoming) {
  const measurementId = env("GA4_MEASUREMENT_ID");
  const apiSecret = env("GA4_API_SECRET");
  if (!measurementId || !apiSecret || !event.send_ga || !event.ga_client_id) return "skipped";

  const params: Record<string, unknown> = {
    ...event.params,
    page_location: event.event_source_url,
    page_title: event.page_title,
    page_referrer: event.referrer,
    engagement_time_msec: 1, // needed for events to show in GA4 reports
  };

  const res = await fetch(
    `https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(measurementId)}&api_secret=${encodeURIComponent(apiSecret)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ client_id: event.ga_client_id, events: [{ name: event.event_name, params }] }),
    },
  );
  if (!res.ok) console.error("GA4 MP error", res.status, await res.text());
  return res.ok ? "sent" : "failed";
}

export default async (req: Request) => {
  if (req.method !== "POST") return json(405, { error: "Method not allowed" });
  if (!originAllowed(req)) return json(403, { error: "Origin not allowed" });

  let event: Incoming;
  try {
    event = await req.json();
  } catch {
    return json(400, { error: "Invalid JSON" });
  }
  if (!event.event_name || !ALLOWED_EVENTS.has(event.event_name) || !event.event_id) {
    return json(400, { error: "Unknown or incomplete event" });
  }

  const [meta, ga] = await Promise.allSettled([sendToMeta(event, req), sendToGa(event)]);
  const result = (r: PromiseSettledResult<string>) => (r.status === "fulfilled" ? r.value : "failed");
  return json(200, { meta: result(meta), ga: result(ga) });
};
