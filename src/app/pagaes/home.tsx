import AboutUs from "./aboutus";
import OurBrands from "./ourbrands";
import OurServices from "./ourservices";
import WhyRajanigandha from "./whyrajanigandha";

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
        <AboutUs />
        <OurBrands />
        <WhyRajanigandha />
        <OurServices />
      </main>
    </>
  );
}
