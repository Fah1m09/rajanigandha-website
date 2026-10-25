const reasons = [
  {
    "eyebrow": "Carefully sourced",
    "number": "5+",
    "title": "Global manufacturing countries",
    "description": "We import high-quality diagnostic reagents from trusted manufacturers across Spain, Italy, Japan, China, and India."
  },
  {
    eyebrow: "Always here to help",
    number: "24 / 7",
    title: "Technical Support",
    description:
      "Our technical support is available around the clock, every day of the year.",
  },
  {
    eyebrow: "Trusted across Bangladesh",
    number: "1300+",
    title: "Hospitals & Diagnostic Centers",
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
        {reasons.map((reason, index) => (
          <article className="about-card why-card" key={index}>
            <p className="home-section-eyebrow">{reason.eyebrow}</p>
            <p className="why-trust-value">
              {reason.number}
            </p>
            <h3>{reason.title}</h3>
            <p className="why-description">{reason.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
