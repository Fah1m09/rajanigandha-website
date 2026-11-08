import Link from "next/link";
import { ArrowRight, ArrowUpRight, Asterisk, FlaskConical, Mail, Microscope, Phone, Sparkle, Wrench } from "lucide-react";
import { Counter, Marquee, Reveal } from "../components/home/motion";
import FeaturedSlider from "../components/home/FeaturedSlider";
import { company } from "../data/company";
import { equipmentList, reagentList } from "../data/catalog";

const featured = (() => {
  const picked = equipmentList.filter((item) => item.featured);
  return picked.length > 0 ? picked : equipmentList.slice(0, 6);
})();

const equipmentCategories = Array.from(new Set(equipmentList.map((item) => item.category)));
const reagentCategories = Array.from(new Set(reagentList.map((item) => item.category))).map((name) => ({
  name,
  products: reagentList.filter((item) => item.category === name).length,
}));

const services = [
  {
    icon: Microscope,
    title: "Diagnostic equipment",
    copy: `${equipmentList.length} analyzers and instruments across ${equipmentCategories.length} categories, from fully automated biochemistry to haematology and coagulation.`,
    to: "/equipments",
    action: "Browse equipment",
  },
  {
    icon: FlaskConical,
    title: "Reagents",
    copy: `${reagentList.length} reagent lines for clinical chemistry, serology, immunochemistry, blood grouping and dedicated analyzer lines, in the pack sizes your lab runs.`,
    to: "/reagent",
    action: "Browse reagents",
  },
  {
    icon: Wrench,
    title: "Technical service",
    copy: "Installation support, regular maintenance and round-the-clock help from our engineers to keep your instruments running.",
    to: "/contact",
    action: "Talk to an engineer",
  },
];

// TODO confirm wording with the team.
const steps = [
  { title: "Consult", copy: "Tell us your test menu and daily volume. We recommend the analyzer and reagents that fit your lab and budget." },
  { title: "Supply", copy: "Genuine products imported directly from our manufacturing partners, delivered across Bangladesh." },
  { title: "Set up", copy: "Our engineers help install and calibrate the instrument and get your team comfortable running it." },
  { title: "Support", copy: "Ongoing maintenance, reagent resupply and 24/7 technical help for as long as you use the equipment." },
];

export default function HomePage() {
  return (
    <main className="hm">
      <Hero />
      <div className="hm-band">
        <Marquee items={[...equipmentCategories, ...reagentCategories.map((c) => c.name)]} />
      </div>
      <Intro />
      <FeaturedSlider featured={featured} total={equipmentList.length} />
      <Services />
      <Process />
      <Brands />
      <ReagentRange />
      <Cta />
    </main>
  );
}

// Hero banner photo. Placeholder for now: swap the file path when the final photo is ready.
const heroVideo = "/img/broll.mp4";
// Still image shown while the video loads (or if it can't play).
const heroPoster = "/img/sp-low-web.jpg";

function Hero() {
  // The wide card shows the first featured product that has a photo.
  const product = featured.find((item) => item.image);
  const [years, providers] = company.stats;
  return (
    <section className="hm-hero" aria-labelledby="hm-hero-title">
      <div className="hm-wrap">
        <div className="hm-hero-main">
          <div className="hm-hero-copy">
            <ul className="hm-hero-tags" aria-label="What we supply">
              <li><Sparkle aria-hidden="true" />Equipment</li>
              <li><Sparkle aria-hidden="true" />Reagents</li>
              <li><Sparkle aria-hidden="true" />Service</li>
            </ul>

            <h1 className="hm-hero-title" id="hm-hero-title">
              <span className="hm-line"><span>Diagnostic</span></span>
              <span className="hm-line"><span>solutions for</span></span>
              <span className="hm-line">
                <span><Asterisk className="hm-hero-star" aria-hidden="true" />every lab</span>
              </span>
            </h1>

            <hr className="hm-hero-rule" />

            <p className="hm-hero-lead">
              Since {company.since}, we have supplied diagnostic analyzers and reagents from trusted
              manufacturers, and kept them running with our own technical team.
            </p>

            <div className="hm-actions">
              <Link className="hm-btn hm-btn-primary" href="/equipments">Browse equipment</Link>
              <Link className="hm-btn hm-btn-soft" href="/contact">
                Request a quote <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Banner photo with a notch cut into its left edge. */}
          <div className="hm-hero-media">
            {/* Browsers only autoplay video that is muted; playsInline stops iPhones opening it full screen. */}
            <video
              src={heroVideo}
              poster={heroPoster}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
            />
            <span className="hm-hero-notch" aria-hidden="true" />
          </div>
        </div>

        <div className="hm-hero-cards">
          <Link className="hm-hero-card is-wide" href="/equipments">
            <p className="hm-hero-card-text">
              <span>Genuine products from {company.brands.length} trusted brands</span>
            </p>
            {product?.image && <img src={product.image} alt="" />}
          </Link>

          <div className="hm-hero-card">
            <strong><Counter value={providers.value} suffix={providers.suffix} /></strong>
            <p className="hm-hero-card-text"><span>{providers.label} trust our products</span></p>
          </div>

          <div className="hm-hero-card is-alt">
            <strong><Counter value={years.value} suffix="+" /></strong>
            <p className="hm-hero-card-text"><span>Years serving labs across Bangladesh</span></p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="hm-section" aria-labelledby="hm-intro-title">
      <div className="hm-wrap">
        <Reveal as="p" className="hm-eyebrow">About {company.name}</Reveal>
        <Reveal as="h2" className="hm-statement" delay={80}>
          <span id="hm-intro-title">Dependable products and responsive support,</span>{" "}
          <span className="hm-muted">so hospitals and diagnostic centres can focus on their patients.</span>
        </Reveal>
        <div className="hm-stats">
          {company.stats.map((stat, index) => (
            <Reveal as="article" className="hm-stat" delay={index * 90} key={stat.label}>
              <p className="hm-stat-label">{stat.label}</p>
              <p className="hm-stat-value"><Counter value={stat.value} suffix={stat.suffix} /></p>
              <p className="hm-stat-note">{stat.note}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="hm-section hm-dark" aria-labelledby="hm-services-title">
      <div className="hm-wrap">
        <Reveal as="p" className="hm-eyebrow">What we do</Reveal>
        <Reveal as="h2" className="hm-h2" delay={80}><span id="hm-services-title">One partner for your whole lab</span></Reveal>
        <ol className="hm-services">
          {services.map(({ icon: Icon, ...service }, index) => (
            <Reveal as="li" delay={index * 90} key={service.title}>
              <Link className="hm-service" href={service.to}>
                <span className="hm-service-num">0{index + 1}</span>
                <span className="hm-service-icon" aria-hidden="true"><Icon /></span>
                <div className="hm-service-main">
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                </div>
                <span className="hm-service-action">
                  {service.action} <ArrowUpRight aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="hm-section" aria-labelledby="hm-process-title">
      <div className="hm-wrap hm-process">
        <div className="hm-process-intro">
          <Reveal as="p" className="hm-eyebrow">How we work</Reveal>
          <Reveal as="h2" className="hm-h2" delay={80}><span id="hm-process-title">From first call to every test after</span></Reveal>
        </div>
        <ol className="hm-steps">
          {steps.map((step, index) => (
            <li className="hm-step" key={step.title} style={{ top: `calc(6rem + ${index * 1.5}rem)` }}>
              <span className="hm-step-num">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Brands() {
  return (
    <section className="hm-section" aria-labelledby="hm-brands-title">
      <div className="hm-wrap">
        <div className="hm-heading-row">
          <Reveal>
            <p className="hm-eyebrow">Our partners</p>
            <h2 className="hm-h2" id="hm-brands-title">Brands we represent</h2>
          </Reveal>
          <Reveal as="ul" className="hm-pills hm-pills-small" delay={120} >
            {company.sourcingCountries.map((country) => <li key={country}>{country}</li>)}
          </Reveal>
        </div>
        <div className="hm-brands">
          {company.brands.map((brand, index) => (
            <Reveal as="article" className="hm-brand" delay={index * 100} key={brand.name}>
              <div className="hm-brand-top">
                <span className="hm-brand-logo">
                  <img src={brand.logo} alt={`${brand.name} logo`} />
                </span>
                <span className="hm-sticker">Since {brand.since}</span>
              </div>
              <h3>{brand.name}</h3>
              <div className="hm-brand-origin">{brand.origin}</div>
              <p>{brand.description}</p>
              <a className="hm-link" href={brand.href} target="_blank" rel="noreferrer">
                Visit {brand.name} <ArrowUpRight aria-hidden="true" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReagentRange() {
  return (
    <section className="hm-section" aria-labelledby="hm-reagents-title">
      <div className="hm-wrap">
        <Reveal as="p" className="hm-eyebrow">Reagent range</Reveal>
        <Reveal as="h2" className="hm-h2" delay={80}><span id="hm-reagents-title">Reagents for every bench</span></Reveal>
        <div className="hm-tiles">
          {reagentCategories.map((category, index) => (
            <Reveal delay={index * 80} key={category.name}>
              <Link className="hm-tile" href={`/reagent?category=${encodeURIComponent(category.name)}`}>
                <span className="hm-tile-count">{category.products}</span>
                <span className="hm-tile-name">{category.name}</span>
                <span className="hm-round-arrow" aria-hidden="true"><ArrowUpRight /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="hm-section hm-cta-section" aria-labelledby="hm-cta-title">
      <div className="hm-wrap">
        <Reveal className="hm-cta">
          <p className="hm-eyebrow">Get in touch</p>
          <h2 id="hm-cta-title">Let’s equip <em>your lab.</em></h2>
          <div className="hm-cta-row">
            <Link className="hm-btn hm-btn-primary" href="/contact">
              Request a quote <ArrowUpRight aria-hidden="true" />
            </Link>
            <a className="hm-cta-contact" href={`tel:${company.phone}`}><Phone aria-hidden="true" /> {company.phone}</a>
            <a className="hm-cta-contact" href={`mailto:${company.email}`}><Mail aria-hidden="true" /> {company.email}</a>
          </div>
        </Reveal>
      </div>
      <div className="hm-band hm-band-dark">
        <Marquee items={company.brands.map((b) => b.name).concat(company.sourcingCountries)} reverse />
      </div>
    </section>
  );
}
