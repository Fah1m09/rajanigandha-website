import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Check, Download, Headphones, ShieldCheck, Wrench } from "lucide-react";
import type { iEquipment } from "../../types/Equipment";
import { equipmentList, formatPrice } from "../../data/catalog";
import { Reveal } from "../components/home/motion";
import { PageCta, ProductCard } from "../components/ui";
import "../../assets/scss/home.scss";
import "../../assets/scss/pages.scss";

export default function EquipmentDetails() {
  const { equipmentId } = useParams();
  // Old links used numeric ids (/equipments/1); those map to the original display order.
  const equipment = equipmentList.find((item) => item.slug === equipmentId)
    ?? equipmentList.find((item) => String(item.order) === equipmentId);

  if (!equipment) {
    return (
      <main className="hm pg">
        <div className="hm-wrap pg-detail pg-empty">
          <h1 className="pg-title pg-title-sm">Product not found</h1>
          <p>This product may have been renamed or removed.</p>
          <Link className="hm-btn hm-btn-primary" to="/equipments">Browse all equipment</Link>
        </div>
      </main>
    );
  }
  // key resets the image gallery when moving between products
  return <Detail equipment={equipment} key={equipment.slug} />;
}

function Detail({ equipment }: { equipment: iEquipment }) {
  const images = [equipment.image, ...(equipment.gallery ?? [])];
  const [active, setActive] = useState(0);
  const price = formatPrice(equipment.tradePrice);
  const specs = equipment.specs ?? [];
  const features = equipment.features ?? [];
  const quoteLink = `/contact?subject=${encodeURIComponent(`Quote request: ${equipment.name}`)}`;

  const sameCategory = equipmentList.filter((item) => item.category === equipment.category && item.slug !== equipment.slug);
  const sameBrand = equipmentList.filter((item) => item.brand === equipment.brand && item.category !== equipment.category);
  const related = [...sameCategory, ...sameBrand].slice(0, 3);

  return (
    <main className="hm pg">
      <div className="hm-wrap pg-detail">
        <Link className="pg-back" to="/equipments"><ArrowLeft aria-hidden="true" /> All equipment</Link>

        <div className="pg-detail-grid">
          <div className="pg-gallery pg-rise">
            <div className="pg-gallery-main">
              <img src={images[active]} alt={equipment.name} />
              <span className="hm-sticker">{equipment.brand}</span>
            </div>
            {images.length > 1 && (
              <div className="pg-thumbs">
                {images.map((src, index) => (
                  <button
                    aria-label={`Show image ${index + 1}`}
                    aria-pressed={index === active}
                    key={src}
                    onClick={() => setActive(index)}
                    type="button"
                  >
                    <img src={src} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="pg-info pg-rise">
            <p className="hm-eyebrow">{equipment.category}</p>
            <h1 className="pg-title pg-title-sm">{equipment.name}</h1>
            <dl className="pg-meta">
              <div><dt>Brand</dt><dd>{equipment.brand}</dd></div>
              <div><dt>Category</dt><dd>{equipment.category}</dd></div>
            </dl>
            {equipment.summary && <p className="pg-lead">{equipment.summary}</p>}

            <div className="pg-price-card">
              <div>
                <p className="pg-price-label">Trade price</p>
                <p className="pg-price">{price ?? "On request"}</p>
              </div>
              <div className="pg-price-actions">
                <Link className="hm-btn hm-btn-primary" to={quoteLink}>
                  Request a quote <ArrowUpRight aria-hidden="true" />
                </Link>
                {equipment.brochure && (
                  <a className="hm-btn hm-btn-ghost" href={equipment.brochure} target="_blank" rel="noreferrer">
                    <Download aria-hidden="true" /> Brochure
                  </a>
                )}
              </div>
            </div>

            <ul className="pg-assurances">
              <li><ShieldCheck aria-hidden="true" /> Genuine {equipment.brand} product</li>
              <li><Wrench aria-hidden="true" /> Maintenance by our engineers</li>
              <li><Headphones aria-hidden="true" /> 24/7 technical support</li>
            </ul>
          </div>
        </div>

        <section className={`pg-spec-grid${features.length ? "" : " is-single"}`} aria-label="Product details">
          <Reveal className="pg-panel">
            <h2 className="pg-h3">Specifications</h2>
            {specs.length > 0 ? (
              <dl className="pg-specs">
                {specs.map((spec) => (
                  <div key={spec.label}><dt>{spec.label}</dt><dd>{spec.value}</dd></div>
                ))}
              </dl>
            ) : (
              <p className="pg-muted">
                Full specifications are available on request. <Link className="hm-link" to={quoteLink}>Ask our team</Link>
              </p>
            )}
          </Reveal>
          {features.length > 0 && (
            <Reveal className="pg-panel" delay={100}>
              <h2 className="pg-h3">Key features</h2>
              <ul className="pg-features">
                {features.map((feature) => <li key={feature}><Check aria-hidden="true" /> {feature}</li>)}
              </ul>
            </Reveal>
          )}
        </section>

        {related.length > 0 && (
          <section className="pg-related" aria-labelledby="pg-related-title">
            <Reveal>
              <p className="hm-eyebrow">Keep exploring</p>
              <h2 className="hm-h2" id="pg-related-title">Related equipment</h2>
            </Reveal>
            <ul className="pg-grid">
              {related.map((item, index) => (
                <Reveal as="li" className="hm-product" delay={index * 80} key={item.slug}>
                  <ProductCard item={item} showPrice />
                </Reveal>
              ))}
            </ul>
          </section>
        )}
      </div>

      <PageCta
        title={`Interested in the ${equipment.name}?`}
        text="Ask for a quote, delivery details or service options. Our team will get back to you quickly."
      />
    </main>
  );
}
