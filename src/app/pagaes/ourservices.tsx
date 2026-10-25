import { Link } from "react-router-dom";

const services = [
  {
    icon: "equipment",
    title: "Medical equipment",
    copy: "Explore diagnostic equipment for blood testing and clinical laboratories.",
    action: "Browse equipment",
    to: "/equipments",
  },
  {
    icon: "reagent",
    title: "Diagnostic reagents",
    copy: "Find reagents and products for a range of diagnostic testing needs.",
    action: "Browse reagents",
    to: "/reagent",
  },
  {
    icon: "service",
    title: "Technical service",
    copy: "Get support and regular maintenance for your diagnostic equipment.",
    action: "Contact our team",
    to: "/contact",
  },
];

export default function OurServices() {
  return (
    <section className="home-section" aria-labelledby="services-heading">
      <div className="home-section-heading">
        <p className="home-section-eyebrow">Products and support</p>
        <h2 className="home-section-title" id="services-heading">Our Services</h2>
      </div>
      <div className="home-service-grid">
        {services.map((service, index) => (
          <article className="about-card home-service-card" key={service.title}>
            <div className="home-service-icon">
              <img src={`img/${service.icon}.svg`} alt="" />
            </div>
            <p className="home-section-eyebrow">0{index + 1} / Healthcare solutions</p>
            <h3>{service.title}</h3>
            <p className="home-service-copy">{service.copy}</p>
            <Link className="home-text-link" to={service.to}>
              {service.action}<span aria-hidden="true"> →</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
