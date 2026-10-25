const brands = [
  {
    name: "Spinreact",
    image: "img/spinlogo.png",
    href: "https://www.spinreact.com/",
    description:
      "A specialist in in-vitro diagnostic reagents and electro-medical equipment. Rajanigandha International has represented Spinreact in Bangladesh since 1990.",
    className: "home-brand-spinreact",
  },
  {
    name: "Microlab",
    image: "img/microlab.png",
    href: "https://www.microlab.co.in/",
    description:
      "A medical equipment manufacturer from India, producing biochemistry analyzers, blood cell counters, and clinical diagnostic products. Our partnership began in 2008.",
    className: "home-brand-microlab",
  },
];

export default function OurBrands() {
  return (
    <section className="home-section" aria-labelledby="brands-heading">
      <div className="home-section-heading">
        <p className="home-section-eyebrow">Partners in better diagnostics</p>
        <h2 className="home-section-title" id="brands-heading">Our Brands</h2>
      </div>
      <div className="home-brand-grid">
        {brands.map((brand) => (
          <article className={`about-card home-brand-card ${brand.className}`} key={brand.name}>
            <a
              className="home-brand-logo"
              href={brand.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`Visit ${brand.name} website`}
            >
              <img src={brand.image} alt={`${brand.name} logo`} />
            </a>
            <div className="home-brand-copy">
              <p className="home-section-eyebrow">Our distribution partner</p>
              <h3>{brand.name}</h3>
              <p>{brand.description}</p>
              <a className="home-text-link" href={brand.href} target="_blank" rel="noreferrer">
                Discover {brand.name}<span aria-hidden="true"> ↗</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
