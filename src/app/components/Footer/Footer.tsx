import { ArrowUp, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { company } from "../../../data/company";

const links = [
  { name: "Home", path: "/" },
  { name: "Equipment", path: "/equipments" },
  { name: "Reagents", path: "/reagent" },
  { name: "News", path: "/news" },
  { name: "Contact", path: "/contact" },
];

export default function Footer() {
  const toTop = () => {
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
  };

  return (
    <footer className="sf">
      <div className="sf-panel">
        <div className="sf-grid">
          <div className="sf-about">
            <p className="sf-lead">
              Diagnostic equipment, reagents and technical service for laboratories across Bangladesh.
            </p>
            <Link className="sf-cta" to="/contact">
              Request a quote <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>

          <nav aria-label="Footer">
            <p className="sf-title">Explore</p>
            <ul className="sf-list">
              {links.map((link) => (
                <li key={link.path}><Link className="sf-link" to={link.path}>{link.name}</Link></li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="sf-title">Talk to us</p>
            <ul className="sf-list">
              {company.phones.map((phone) => (
                <li key={phone}><a className="sf-link" href={`tel:${phone}`}><Phone aria-hidden="true" />{phone}</a></li>
              ))}
              <li><a className="sf-link" href={`mailto:${company.email}`}><Mail aria-hidden="true" />{company.email}</a></li>
            </ul>
          </div>

          <div>
            <p className="sf-title">Visit us</p>
            <address className="sf-address">
              <MapPin aria-hidden="true" />
              <span>{company.address.map((line) => <span key={line}>{line}</span>)}</span>
            </address>
          </div>
        </div>

        <p className="sf-wordmark" aria-hidden="true">Rajanigandha</p>

        <div className="sf-bottom">
          <p>© {new Date().getFullYear()} {company.name}</p>
          <p>Serving laboratories since {company.since}</p>
          <button className="sf-top" onClick={toTop} type="button" aria-label="Back to top">
            <ArrowUp aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
