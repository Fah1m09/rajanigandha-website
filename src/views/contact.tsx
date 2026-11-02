"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight, CheckCircle2, Mail, MapPin, Phone, Send } from "lucide-react";
import { company } from "../data/company";
import { Reveal } from "../components/home/motion";
import { trackLead } from "../services/analytics";
import { sendContactEmail } from "../services/email";

type Status = "idle" | "sending" | "sent" | "error";

// Google My Maps map that marks the offices
const MAP_URL = "https://www.google.com/maps/d/u/0";
const MAP_ID = "1k3k6XWGeh56dGbTpKaH4BxWA82TUQA5B";

// The pre-rendered HTML has an empty subject; links like /contact?subject=… fill it in the browser.
export default function Contact() {
  return (
    <Suspense fallback={<ContactPage subject="" />}>
      <ContactFromUrl />
    </Suspense>
  );
}

function ContactFromUrl() {
  return <ContactPage subject={useSearchParams().get("subject") ?? ""} />;
}

function ContactPage({ subject }: { subject: string }) {
  const [status, setStatus] = useState<Status>("idle");

  // Messages are emailed through EmailJS (see services/email.ts).
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const field = (name: string) => String(data.get(name) ?? "").trim() || undefined;

    // Bots fill the hidden field; pretend it worked and send nothing
    if (field("bot-field")) {
      form.reset();
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      await sendContactEmail({
        name: field("name") ?? "",
        email: field("email") ?? "",
        phone: field("phone"),
        organization: field("organization"),
        subject: field("subject"),
        message: field("message") ?? "",
      });
      // Email/phone go only to our own server, which hashes them before sending to Meta.
      trackLead(
        { form_name: "contact", content_name: field("subject") ?? "General enquiry" },
        { email: field("email"), phone: field("phone"), name: field("name") },
      );
      form.reset();
      setStatus("sent");
    } catch (error) {
      console.error("Contact form failed to send", error);
      setStatus("error");
    }
  };

  return (
    <main className="hm pg">
      <section className="pg-hero" aria-labelledby="pg-title">
        <div className="hm-wrap">
          <p className="hm-eyebrow pg-rise">Get in touch</p>
          <h1 className="pg-title pg-rise" id="pg-title">Let’s talk about <em>your lab.</em></h1>
          <p className="pg-lead pg-rise">
            Questions about a product, a quote, or need technical support? Call, email or send a
            message and our team will get back to you.
          </p>
        </div>
      </section>

      <section className="pg-results" aria-label="Contact details">
        <div className="hm-wrap">
          <div className="pg-contact-cards">
            <Reveal as="article" className="pg-contact-card is-accent">
              <span className="pg-contact-icon"><Phone aria-hidden="true" /></span>
              <p className="pg-contact-label">Call our team</p>
              {company.phones.map((phone) => <a key={phone} href={`tel:${phone}`}>{phone}</a>)}
            </Reveal>
            <Reveal as="article" className="pg-contact-card" delay={90}>
              <span className="pg-contact-icon"><Mail aria-hidden="true" /></span>
              <p className="pg-contact-label">Email us</p>
              <a href={`mailto:${company.email}`}>{company.email}</a>
              <p className="pg-contact-note">We usually reply within one working day.</p>
            </Reveal>
            <Reveal as="article" className="pg-contact-card is-dark" delay={180}>
              <span className="pg-contact-icon"><MapPin aria-hidden="true" /></span>
              <p className="pg-contact-label">Visit our head office</p>
              {company.address.map((line) => <p key={line}>{line}</p>)}
            </Reveal>
          </div>

          <div className="pg-contact-grid">
            <Reveal className="pg-panel pg-form-panel">
              <p className="hm-eyebrow">Send a message</p>
              <h2 className="pg-h3">How can we help?</h2>

              {status === "sent" ? (
                <div className="pg-form-done" role="status">
                  <CheckCircle2 aria-hidden="true" />
                  <h3>Thanks, your message is on its way.</h3>
                  <p>Our team will get back to you soon. For anything urgent, call {company.phone}.</p>
                  <button className="hm-btn hm-btn-ghost" type="button" onClick={() => setStatus("idle")}>
                    Send another message
                  </button>
                </div>
              ) : (
                <form className="pg-form" name="contact" onSubmit={submit}>
                  <p className="sr-only">
                    <label>Leave this field empty <input name="bot-field" tabIndex={-1} autoComplete="off" /></label>
                  </p>
                  <div className="pg-form-row">
                    <label>
                      <span>Name *</span>
                      <input autoComplete="name" name="name" placeholder="Your name" required type="text" />
                    </label>
                    <label>
                      <span>Email *</span>
                      <input autoComplete="email" name="email" placeholder="you@example.com" required type="email" />
                    </label>
                  </div>
                  <div className="pg-form-row">
                    <label>
                      <span>Phone</span>
                      <input autoComplete="tel" name="phone" placeholder="01XXXXXXXXX" type="tel" />
                    </label>
                    <label>
                      <span>Hospital / lab</span>
                      <input autoComplete="organization" name="organization" placeholder="Organisation name" type="text" />
                    </label>
                  </div>
                  <label>
                    <span>Subject</span>
                    <input name="subject" placeholder="Product, quote or support request" type="text" defaultValue={subject} />
                  </label>
                  <label>
                    <span>Message *</span>
                    <textarea name="message" placeholder="Tell us what you need…" required rows={5} />
                  </label>
                  {status === "error" && (
                    <p className="pg-form-error" role="alert">
                      Sorry, the message couldn’t be sent. Please try again, or email {company.email}.
                    </p>
                  )}
                  <button className="hm-btn hm-btn-dark" disabled={status === "sending"} type="submit">
                    {status === "sending" ? "Sending…" : "Send message"} <Send aria-hidden="true" />
                  </button>
                </form>
              )}
            </Reveal>

            <div className="pg-contact-side">
              {/* Framed like the product cards: map inside an inset frame, details row below */}
              <Reveal className="pg-map-card" delay={100}>
                <div className="pg-map-frame">
                  {/* ehbc sets the map's header bar colour (theme black) */}
                  <iframe title="Map of our offices" loading="lazy" src={`${MAP_URL}/embed?mid=${MAP_ID}&ehbc=0D0D0D`} />
                </div>
                <a className="pg-map-body" href={`${MAP_URL}/viewer?mid=${MAP_ID}`} target="_blank" rel="noreferrer">
                  <div>
                    <p className="hm-product-cat">Find us</p>
                    <h3>Kakrail, {company.city}</h3>
                    <p className="pg-muted">Open in Google Maps</p>
                  </div>
                  <span className="hm-round-arrow" aria-hidden="true"><ArrowUpRight /></span>
                </a>
              </Reveal>
              <Reveal className="pg-panel" delay={180}>
                <p className="hm-eyebrow">Across Bangladesh</p>
                <h2 className="pg-h3">Our offices</h2>
                <ul className="pg-branches">
                  {company.branches.map((branch) => (
                    <li key={branch.name}>
                      <MapPin aria-hidden="true" />
                      <div>
                        <p className="pg-branch-name">{branch.name}</p>
                        <p className="pg-muted">{branch.address || branch.city}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <a className="hm-link" href={`tel:${company.phone}`}>
                  Call to find your nearest office <ArrowUpRight aria-hidden="true" />
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
