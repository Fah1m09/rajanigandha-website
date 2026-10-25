export default function HomePage() {
  return (
    <>
      <section className="header">
        <div className="inner-header flex"><h1>Welcome to Rajanigandha International</h1></div>
        <svg className="waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none" aria-hidden="true">
          <defs><path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" /></defs>
          <g className="parallax">{[0, 3, 5, 7].map((y, i) => <use key={y} href="#gentle-wave" x="48" y={y} fill={i === 3 ? "#fff" : `rgba(255,255,255,${0.7 - i * 0.2})`} />)}</g>
        </svg>
      </section>
      <main className="container space-y-12">
        <section><h1 className="heading">About Us</h1><p className="about-text">Welcome to the official site of Rajanigandha International, one of the country's oldest medical equipment and diagnostic reagent importers and suppliers. Our journey began in 1989. We continue to provide diagnostic equipment and rapid service, building the trust of countless people along the way.</p></section>
        <section className="space-y-6"><h1 className="heading">Our Brands</h1>
          <article className="brand grid grid-cols-1 items-center gap-6 md:grid-cols-2 lg:grid-cols-3"><a className="brand-image" href="http://www.spinreact.com/" target="_blank" rel="noreferrer"><img src="img/spinlogo.png" alt="Spinreact" /></a><div className="lg:col-span-2"><h3 className="text-[#232f5f] dark:text-white"><u>Spinreact</u></h3><p>Spinreact is a leading company in electro-medical equipment and reagents. Rajanigandha International has been its exclusive distributor in Bangladesh since 1990. Spinreact develops and manufactures in vitro diagnostic reagents and maintains certified quality systems.</p></div></article>
          <article className="brand grid grid-cols-1 items-center gap-6 md:grid-cols-2 lg:grid-cols-3"><div className="lg:col-span-2"><h3 className="text-[#193a6b] dark:text-white"><u>Microlab</u></h3><p>Microlab Instruments is a medical equipment producer based in India. Since 2008, we have been its sole and exclusive distributor in Bangladesh. The company makes biochemistry analyzers, blood cell counters, and clinical diagnostic products, supported by an after-sales service team.</p></div><a className="brand-image lg:col-start-3" href="https://www.microlab.co.in/" target="_blank" rel="noreferrer"><img src="img/microlab.png" alt="Microlab" /></a></article>
        </section>
        <section><h1 className="heading">Why Rajanigandha?</h1><div className="grid grid-cols-1 gap-6 sm:grid-cols-3">{["building", "security", "server"].map((name) => <img className="small-svg mx-auto" src={`img/undraw_${name}.svg`} alt="" key={name} />)}</div></section>
        <section><h1 className="heading">Our Services</h1><div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">{[{ icon: "equipment", title: "Equipments", copy: "We sell a variety of medical equipment related to blood testing", action: "Browse" }, { icon: "reagent", title: "Reagent", copy: "All sorts of blood testing reagents are available in our house.", action: "Browse" }, { icon: "service", title: "Services", copy: "Regular maintenance of our equipment is ensured by us", action: "Call for Details" }].map((service) => <article className="service-card" key={service.title}><div className="card-img"><img src={`img/${service.icon}.svg`} alt="" /></div><div className="card-text"><h3><u>{service.title}</u></h3><p>{service.copy}</p><button className="card-button">{service.action}</button></div></article>)}</div></section>
      </main>
    </>
  );
}
