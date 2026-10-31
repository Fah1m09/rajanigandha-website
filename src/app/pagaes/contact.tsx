import { useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowUpRight, CheckCircle2, Mail, MapPin, Phone, Send } from "lucide-react";
import { company } from "../../data/company";
import { Reveal } from "../components/home/motion";
import "../../assets/scss/home.scss";
import "../../assets/scss/pages.scss";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [params] = useSearchParams();
  const [status, setStatus] = useState<Status>("idle");

  // Netlify Forms: the matching hidden form in index.html lets Netlify detect this form at deploy time.
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      const body = new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString();
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      if (!response.ok) throw new Error(String(response.status));
      form.reset();
      setStatus("sent");
    } catch {
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
                <form className="pg-form" name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={submit}>
                  <input type="hidden" name="form-name" value="contact" />
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
                    <input name="subject" placeholder="Product, quote or support request" type="text" defaultValue={params.get("subject") ?? ""} />
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
              <Reveal className="pg-panel pg-map-panel" delay={100}>
                <iframe
                  title="Map of our offices"
                  loading="lazy"
                  src="https://www.google.com/maps/d/u/0/embed?mid=1k3k6XWGeh56dGbTpKaH4BxWA82TUQA5B&ehbc=2E312F"
                />
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
