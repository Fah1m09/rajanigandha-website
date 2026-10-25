import { Mail, MapPin, Phone, Send } from "lucide-react";

const branches = ["Main Branch", "Chittagong Branch", "Sylhet Branch"];

export default function Contact() {
  return (
    <main className="contact-page">
      <section className="contact-hero" aria-labelledby="contact-heading">
        <p className="contact-eyebrow">We’re here to help</p>
        <h1 id="contact-heading">Let’s talk healthcare.</h1>
        <p>
          Have a question about our products or need technical support? Get in
          touch with our team and we’ll be glad to help.
        </p>
      </section>

      <section className="contact-info-grid" aria-label="Contact information">
        <article className="contact-info-card contact-phone-card">
          <span className="contact-icon">
            <Phone aria-hidden="true" />
          </span>
          <p className="contact-card-label">Call our team</p>
          <a href="tel:01730376269">01730376269</a>
          <a href="tel:01777799333">01777799333</a>
        </article>
        <article className="contact-info-card">
          <span className="contact-icon">
            <Mail aria-hidden="true" />
          </span>
          <p className="contact-card-label">Email us</p>
          <a href="mailto:rajani@dhaka.net">rajani@dhaka.net</a>
          <p className="contact-card-note">We’d love to hear from you.</p>
        </article>
        <article className="contact-info-card contact-address-card">
          <span className="contact-icon">
            <MapPin aria-hidden="true" />
          </span>
          <p className="contact-card-label">Visit our main office</p>
          <p>5/14, Eastern Commercial Complex</p>
          <p>73 Kakrail, Dhaka 1000, Bangladesh</p>
        </article>
      </section>

      <section className="contact-locations" aria-labelledby="locations-heading">
        <div className="contact-section-heading">
          <div>
            <p className="contact-eyebrow">Find us across Bangladesh</p>
            <h2 id="locations-heading">Our branches &amp; distributors</h2>
          </div>
          <p>We’re here to support you, wherever you are.</p>
        </div>
        <div className="contact-branch-list">
          {branches.map((branch) => (
            <article className="contact-branch-card" key={branch}>
              <MapPin aria-hidden="true" />
              <div>
                <h3>{branch}</h3>
                <p>5/14, Eastern Commercial Complex, 73 Kakrail, Dhaka 1000</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-connect-grid" aria-label="Map and message form">
        <div className="contact-map-panel">
          <div className="contact-section-heading">
            <div>
              <p className="contact-eyebrow">Come say hello</p>
              <h2>Find our locations</h2>
            </div>
          </div>
          <iframe
            title="Map of our branches and distributors"
            className="contact-map"
            loading="lazy"
            src="https://www.google.com/maps/d/u/0/embed?mid=1k3k6XWGeh56dGbTpKaH4BxWA82TUQA5B&ehbc=2E312F"
          />
        </div>

        <div className="contact-form-panel">
          <div className="contact-section-heading">
            <div>
              <p className="contact-eyebrow">Send us a message</p>
              <h2>How can we help?</h2>
            </div>
            <p>Share a few details and our team will be happy to assist.</p>
          </div>
          <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
            <div className="contact-form-row">
              <label>
                <span>Name</span>
                <input autoComplete="name" name="Name" placeholder="Your name" type="text" />
              </label>
              <label>
                <span>Email</span>
                <input autoComplete="email" name="Email" placeholder="you@example.com" type="email" />
              </label>
            </div>
            <label>
              <span>Subject</span>
              <input name="Subject" placeholder="How can we help?" type="text" />
            </label>
            <label>
              <span>Message</span>
              <textarea name="Message" placeholder="Write your message..." rows={5} />
            </label>
            <button type="submit">
              Send message <Send aria-hidden="true" />
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
