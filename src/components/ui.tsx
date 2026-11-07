"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, ChevronLeft, ChevronRight, Microscope, Phone, Search, X } from "lucide-react";
import type { iEquipment } from "../types/Equipment";
import { formatPrice } from "../data/format";
import { company } from "../data/company";
import { Reveal } from "./home/motion";

/** Equipment card used on the home slider, the catalogue grid and "related products". */
export function ProductCard({ item, showPrice = false }: { item: iEquipment; showPrice?: boolean }) {
  return (
    <Link href={`/equipments/${item.slug}`}>
      <div className="hm-product-image">
        {item.image
          ? <img src={item.image} alt={item.name} loading="lazy" />
          : <Microscope className="hm-product-placeholder" aria-label={`${item.name} (no image yet)`} />}
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

/**
 * `sub` marks a subgroup, shown indented under its category.
 * `expanded` (true/false) gives a category a chevron that shows or hides its subgroups.
 * `current` marks a category whose selected subgroup is hidden, so the selection stays visible.
 */
type FilterOption = { value: string; label: string; count: number; sub?: boolean; expanded?: boolean; current?: boolean };
type CategoryTabsProps = {
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
  onToggle?: (value: string) => void;
  label: string;
};

/**
 * Horizontal category tabs on one line. When they don't all fit, the row scrolls sideways,
 * the edges fade, and arrow buttons appear on whichever side has more tabs.
 */
export function CategoryTabs({ options, value, onChange, onToggle, label }: CategoryTabsProps) {
  const scroller = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: false, end: false });

  const measure = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft > 4, end: el.scrollLeft + el.clientWidth < el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [measure]);

  // Keep the selected tab in view, e.g. when the page opens on ?category=...
  useEffect(() => {
    // Scrolls only the tab row, never the page
    const el = scroller.current;
    const tab = el?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (!el || !tab) return;
    // Sideways in the horizontal row (phones), up/down in the vertical sidebar list (desktop)
    if (el.scrollWidth > el.clientWidth) {
      const pad = 48; // room for the arrow button
      if (tab.offsetLeft < el.scrollLeft + pad) el.scrollTo({ left: tab.offsetLeft - pad, behavior: "smooth" });
      else if (tab.offsetLeft + tab.offsetWidth > el.scrollLeft + el.clientWidth - pad) {
        el.scrollTo({ left: tab.offsetLeft + tab.offsetWidth - el.clientWidth + pad, behavior: "smooth" });
      }
    } else if (el.scrollHeight > el.clientHeight) {
      if (tab.offsetTop < el.scrollTop) el.scrollTo({ top: tab.offsetTop - 8, behavior: "smooth" });
      else if (tab.offsetTop + tab.offsetHeight > el.scrollTop + el.clientHeight) {
        el.scrollTo({ top: tab.offsetTop + tab.offsetHeight - el.clientHeight + 8, behavior: "smooth" });
      }
    }
  }, [value]);

  const scrollBy = (direction: 1 | -1) => {
    const el = scroller.current;
    if (el) el.scrollBy({ left: direction * el.clientWidth * 0.7, behavior: "smooth" });
  };

  return (
    <div className={`pg-tabbar${edges.start ? " has-start" : ""}${edges.end ? " has-end" : ""}`}>
      <button aria-label="Show previous categories" className="pg-tabbar-arrow is-start" onClick={() => scrollBy(-1)} tabIndex={-1} type="button">
        <ChevronLeft aria-hidden="true" />
      </button>
      <div className="pg-tabbar-track" onScroll={measure} ref={scroller} role="group" aria-label={label}>
        {options.map((option) => {
          const tab = (
            <button
              aria-pressed={option.value === value}
              className={`pg-tab${option.sub ? " is-sub" : ""}${option.current ? " is-current" : ""}`}
              key={option.value}
              onClick={() => onChange(option.value)}
              type="button"
            >
              {option.label}
              <span className="pg-tab-count">{option.count}</span>
            </button>
          );
          if (option.expanded === undefined || !onToggle) return tab;
          return (
            <div className={`pg-tab-group${option.expanded ? " is-open" : ""}`} key={option.value}>
              {tab}
              <button
                aria-expanded={option.expanded}
                aria-label={`${option.expanded ? "Hide" : "Show"} ${option.label} subcategories`}
                className="pg-tab-toggle"
                onClick={() => onToggle(option.value)}
                type="button"
              >
                <ChevronDown aria-hidden="true" />
              </button>
            </div>
          );
        })}
      </div>
      <button aria-label="Show more categories" className="pg-tabbar-arrow is-end" onClick={() => scrollBy(1)} tabIndex={-1} type="button">
        <ChevronRight aria-hidden="true" />
      </button>
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
            <Link className="hm-btn hm-btn-primary" href="/contact">
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
