const reasons = [
  {
    eyebrow: "Carefully sourced",
    title: "Great quality reagents & instruments",
    description:
      "We import high-quality diagnostic reagents from trusted manufacturers in Spain, Italy, Japan, China & India.",
  },
  {
    eyebrow: "Always here to help",
    title: "24/7/365 technical support",
    description:
      "Our technical support is available around the clock, every day of the year.",
  },
    {
    eyebrow: "Trusted across Bangladesh",
    title: "Hospitals & Diagnostic Centers trust our products",
    description:
      "Supporting hospitals and diagnostic centers with dependable products",
  },
];

export default function WhyRajanigandha() {
  return (
    <section className="home-section" aria-labelledby="why-heading">
      <div className="home-section-heading">
        <p className="home-section-eyebrow">Care you can count on</p>
        <h2 className="home-section-title" id="why-heading">Why Rajanigandha?</h2>
      </div>
      <div className="why-grid">
        {reasons.map((reason) => (
          <article className="about-card why-card" key={reason.number}>
            <span className="why-number" aria-hidden="true">{reason.number}</span>
            <p className="home-section-eyebrow">{reason.eyebrow}</p>
            <h3>{reason.title}</h3>
            <p className="why-description">{reason.description}</p>
          </article>
        ))}
        <article className="about-card why-card">
          <p className="home-section-eyebrow">Trusted across Bangladesh</p>
          <p className="why-trust-value" aria-label="Trusted by over 400 hospitals">
            1300<span>+</span>
          </p>
          <h3></h3>
          <p className="why-description">
            .
          </p>
        </article>
      </div>
    </section>
  );
}
