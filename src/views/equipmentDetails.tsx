import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BadgeCheck, Check, Download, Headphones, ShieldCheck, Wrench } from "lucide-react";
import type { iEquipment } from "../types/Equipment";
import { equipmentList, formatPrice } from "../data/catalog";
import { Reveal } from "../components/home/motion";
import { PageCta, ProductCard } from "../components/ui";
import ProductGallery from "../components/ProductGallery";
import ProductTabs from "../components/ProductTabs";
import TrackView from "../components/TrackView";

// Server component: the route (src/app/equipments/[equipmentId]/page.tsx) finds the product.
export default function EquipmentDetails({ equipment }: { equipment: iEquipment }) {
  const images = [equipment.image, ...(equipment.gallery ?? [])].filter(Boolean);
  const price = formatPrice(equipment.tradePrice);
  const specs = equipment.specs ?? [];
  const features = equipment.features ?? [];
  const highlights = equipment.highlights ?? [];
  const certifications = equipment.certifications ?? [];
  const specGroups = groupSpecs(specs);
  const grouped = specGroups.length > 1;
  const quoteLink = `/contact?subject=${encodeURIComponent(`Quote request: ${equipment.name}`)}`;

  const specContent = grouped ? (
    <div className="pg-spec-groups">
      {specGroups.map((group) => (
        <div className="pg-spec-group" key={group.name}>
          <h3 className="pg-spec-group-title">{group.name}</h3>
          <SpecList specs={group.specs} />
        </div>
      ))}
    </div>
  ) : specs.length > 0 ? (
    <SpecList specs={specs} />
  ) : (
    <p className="pg-muted">
      Full specifications are available on request. <Link className="hm-link" href={quoteLink}>Ask our team</Link>
    </p>
  );

  const viewItem = {
    content_ids: [equipment.slug],
    content_name: equipment.name,
    content_category: equipment.category,
    content_type: "product",
    items: [{ item_id: equipment.slug, item_name: equipment.name, item_brand: equipment.brand, item_category: equipment.category }],
  };

  const sameCategory = equipmentList.filter((item) => item.category === equipment.category && item.slug !== equipment.slug);
  const sameBrand = equipmentList.filter((item) => item.brand === equipment.brand && item.category !== equipment.category);
  const related = [...sameCategory, ...sameBrand].slice(0, 3);

  return (
    <main className="hm pg">
      <TrackView name="view_item" params={viewItem} />
      <div className="hm-wrap pg-detail">
        <Link className="pg-back" href="/equipments"><ArrowLeft aria-hidden="true" /> All equipment</Link>

        <div className="pg-detail-grid">
          {/* key resets the image gallery when moving between products */}
          <ProductGallery key={equipment.slug} images={images} alt={equipment.name} badge={equipment.brand} />

          <div className="pg-info pg-rise">
            <p className="hm-eyebrow">{equipment.category}</p>
            <h1 className="pg-title pg-title-sm">{equipment.name}</h1>
            <dl className="pg-meta">
              <div><dt>Brand</dt><dd>{equipment.brand}</dd></div>
              <div><dt>Category</dt><dd>{equipment.category}</dd></div>
            </dl>
            {equipment.summary && <p className="pg-lead">{equipment.summary}</p>}

            {highlights.length > 0 && (
              <ul className="pg-highlights" aria-label="Highlights">
                {highlights.map((item) => (
                  <li key={item.label}>
                    <span className="pg-highlight-value">{item.value}</span>
                    <span className="pg-highlight-label">{item.label}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="pg-price-card">
              <div>
                <p className="pg-price-label">Trade price</p>
                <p className="pg-price">{price ?? "On request"}</p>
              </div>
              <div className="pg-price-actions">
                <Link className="hm-btn hm-btn-primary" href={quoteLink}>
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

            {certifications.length > 0 && (
              <ul className="pg-certs" aria-label="Certifications">
                {certifications.map((cert) => <li key={cert}><BadgeCheck aria-hidden="true" /> {cert}</li>)}
              </ul>
            )}
          </div>
        </div>

        <section className="pg-details" aria-labelledby="pg-details-title">
          <Reveal>
            <h2 className="pg-h3" id="pg-details-title">Product details</h2>
            {/* Without features there is nothing to switch between, so specs show on their own */}
            {features.length > 0 ? (
              <ProductTabs
                label={`${equipment.name} details`}
                tabs={[
                  { id: "features", label: "Key features", count: features.length, content: <FeatureList features={features} /> },
                  { id: "specs", label: "Specifications", count: specs.length || undefined, content: specContent },
                ]}
              />
            ) : (
              <div className="pg-panel">{specContent}</div>
            )}
          </Reveal>
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

type Spec = NonNullable<iEquipment["specs"]>[number];

// Keeps groups in the order they first appear; ungrouped specs go under "General".
function groupSpecs(specs: Spec[]) {
  const groups: { name: string; specs: Spec[] }[] = [];
  for (const spec of specs) {
    const name = spec.group?.trim() || "General";
    const group = groups.find((item) => item.name === name);
    if (group) group.specs.push(spec);
    else groups.push({ name, specs: [spec] });
  }
  return groups;
}

function SpecList({ specs }: { specs: Spec[] }) {
  return (
    <dl className="pg-specs">
      {specs.map((spec) => (
        <div key={spec.label}><dt>{spec.label}</dt><dd>{spec.value}</dd></div>
      ))}
    </dl>
  );
}

function FeatureList({ features }: { features: string[] }) {
  return (
    <ul className="pg-features is-columns">
      {features.map((feature) => <li key={feature}><Check aria-hidden="true" /> {feature}</li>)}
    </ul>
  );
}
