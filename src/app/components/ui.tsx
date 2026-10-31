import { useId } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Phone, Search, X } from "lucide-react";
import type { iEquipment } from "../../types/Equipment";
import { formatPrice } from "../../data/catalog";
import { company } from "../../data/company";
import { Reveal } from "./home/motion";

/** Equipment card used on the home slider, the catalogue grid and "related products". */
export function ProductCard({ item, showPrice = false }: { item: iEquipment; showPrice?: boolean }) {
  return (
    <Link to={`/equipments/${item.slug}`}>
      <div className="hm-product-image">
        <img src={item.image} alt={item.name} loading="lazy" />
        <span className="hm-sticker">{item.brand}</span>
      </div>
      <div className="hm-product-body">
        <div>
          <p className="hm-product-cat">{item.category}</p>
          <h3>{item.name}</h3>
          {showPrice && <p className="hm-product-price">{formatPrice(item.tradePrice) ?? "Price on request"}</p>}
        </div>
        <span className="hm-round-arrow" aria-hidden="true"><ArrowUpRight /></span>
      </div>
    </Link>
  );
}

type SearchBoxProps = { value: string; onChange: (value: string) => void; label: string };

export function SearchBox({ value, onChange, label }: SearchBoxProps) {
  const id = useId();
  return (
    <div className="pg-search">
      <label className="sr-only" htmlFor={id}>{label}</label>
      <Search aria-hidden="true" />
      <input
        id={id}
        type="search"
        placeholder={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete="off"
      />
      {value && (
        <button type="button" onClick={() => onChange("")} aria-label="Clear search"><X aria-hidden="true" /></button>
      )}
    </div>
  );
}

type FilterOption = { value: string; label: string; count: number };
type FilterPillsProps = { options: FilterOption[]; value: string; onChange: (value: string) => void; label: string };

export function FilterPills({ options, value, onChange, label }: FilterPillsProps) {
  return (
    <div className="pg-filters" role="group" aria-label={label}>
      {options.map((option) => (
        <button
          aria-pressed={option.value === value}
          className="pg-pill"
          key={option.value}
          onClick={() => onChange(option.value)}
          type="button"
        >
          {option.label}
          <span className="pg-pill-count">{option.count}</span>
        </button>
      ))}
    </div>
  );
}

/** Dark closing panel that points visitors to a quote or a call. */
export function PageCta({ title, text }: { title: string; text: string }) {
  return (
    <section className="hm-section pg-cta-section">
      <div className="hm-wrap">
        <Reveal className="pg-cta">
          <div>
            <p className="hm-eyebrow">Talk to our team</p>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
          <div className="pg-cta-actions">
            <Link className="hm-btn hm-btn-primary" to="/contact">
              Request a quote <ArrowUpRight aria-hidden="true" />
            </Link>
            <a className="pg-cta-phone" href={`tel:${company.phone}`}>
              <Phone aria-hidden="true" /> {company.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
