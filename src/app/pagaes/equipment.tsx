import { useMemo, useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import EquipmetsData from "../../assets/db";
import type { iEquipment } from "../../types/Equipment";

const equipmentData = EquipmetsData as iEquipment[];
const categories = [
  "All equipment",
  ...Array.from(new Set(equipmentData.map((item) => item.Category))),
];

export default function Equipment() {
  const [filter, setFilter] = useState(categories[0]);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const equipment = useMemo(
    () => filter === categories[0]
      ? equipmentData
      : equipmentData.filter((item) => item.Category === filter),
    [filter],
  );

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % categories.length;
    else if (event.key === "ArrowLeft") nextIndex = (index - 1 + categories.length) % categories.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = categories.length - 1;
    else return;

    event.preventDefault();
    setFilter(categories[nextIndex]);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <main className="equipment-page">
      <header className="equipment-hero">
        <p className="equipment-eyebrow">Reliable tools for better diagnostics</p>
        <h1>Medical equipment</h1>
        <p>
          Explore dependable diagnostic instruments selected to support
          laboratories and healthcare teams across Bangladesh.
        </p>
      </header>

      <section aria-label="Browse equipment by category">
        <div className="equipment-tabs" role="tablist" aria-label="Equipment categories">
          {categories.map((category, index) => {
            const selected = filter === category;
            const count = category === categories[0]
              ? equipmentData.length
              : equipmentData.filter((item) => item.Category === category).length;

            return (
              <button
                aria-selected={selected}
                className={`equipment-tab${selected ? " is-selected" : ""}`}
                id={`equipment-tab-${index}`}
                key={category}
                onClick={() => setFilter(category)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                ref={(element) => { tabRefs.current[index] = element; }}
                role="tab"
                tabIndex={selected ? 0 : -1}
                type="button"
              >
                {category}
                <span>{count}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section
        aria-labelledby={`equipment-tab-${categories.indexOf(filter)}`}
        className="equipment-results"
        role="tabpanel"
        tabIndex={0}
      >
        <div className="equipment-results-heading">
          <div>
            <p className="equipment-eyebrow">Product catalogue</p>
            <h2>{filter === categories[0] ? "Explore our range" : filter}</h2>
          </div>
          <p>{equipment.length} {equipment.length === 1 ? "product" : "products"}</p>
        </div>

        {equipment.length > 0 ? (
          <div className="equipment-grid">
            {equipment.map((item) => (
              <article className="equipment-card" key={item.Id}>
                <Link className="equipment-card-link" to={`/equipments/${item.Id}`}>
                  <div className="equipment-card-image">
                    <img src={item.Image} alt={item.Name} loading="lazy" />
                    <span className="equipment-card-brand">{item.Brand}</span>
                    <span className="equipment-card-arrow" aria-hidden="true">
                      <ArrowUpRight />
                    </span>
                  </div>
                  <div className="equipment-card-content">
                    <p className="equipment-card-category">{item.Category}</p>
                    <h3>{item.Name}</h3>
                    <p className="equipment-card-price">
                      {item.Price !== 0 ? item.Price : "Contact us for pricing"}
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <p className="equipment-empty">No equipment found in this category.</p>
        )}
      </section>
    </main>
  );
}
