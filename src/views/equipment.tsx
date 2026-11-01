"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { iEquipment } from "../types/Equipment";
import { Reveal } from "../components/home/motion";
import { FilterPills, PageCta, ProductCard, SearchBox } from "../components/ui";
import { useSetCategoryParam } from "../hooks/useCategoryParam";

const ALL = "All";

type Props = { equipmentList: iEquipment[] };

// The pre-rendered HTML shows every product; the ?category= filter is applied in the browser.
export default function Equipment(props: Props) {
  return (
    <Suspense fallback={<Catalog {...props} requested={null} />}>
      <CatalogFromUrl {...props} />
    </Suspense>
  );
}

function CatalogFromUrl(props: Props) {
  return <Catalog {...props} requested={useSearchParams().get("category")} />;
}

function Catalog({ equipmentList, requested }: Props & { requested: string | null }) {
  const categoryOptions = useMemo(() => [
    { value: ALL, label: "All equipment", count: equipmentList.length },
    ...Array.from(new Set(equipmentList.map((item) => item.category))).map((category) => ({
      value: category,
      label: category,
      count: equipmentList.filter((item) => item.category === category).length,
    })),
  ], [equipmentList]);
  const category = categoryOptions.some((option) => option.value === requested) ? requested : ALL;
  const [query, setQuery] = useState("");
  const setCategoryParam = useSetCategoryParam();

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return equipmentList.filter((item) =>
      (category === ALL || item.category === category)
      && (!needle || `${item.name} ${item.brand} ${item.category}`.toLowerCase().includes(needle)));
  }, [equipmentList, category, query]);

  const setCategory = (value: string) => setCategoryParam(value === ALL ? null : value);

  return (
    <main className="hm pg">
      <section className="pg-hero" aria-labelledby="pg-title">
        <div className="hm-wrap">
          <p className="hm-eyebrow pg-rise">Product catalogue</p>
          <h1 className="pg-title pg-rise" id="pg-title">Diagnostic <em>equipment</em></h1>
          <div className="pg-hero-row pg-rise">
            <p className="pg-lead">
              Analyzers and instruments from Spinreact and Microlab, supplied and serviced by our own
              engineers across Bangladesh.
            </p>
            <SearchBox value={query} onChange={setQuery} label="Search equipment" />
          </div>
          <div className="pg-rise">
            <FilterPills options={categoryOptions} value={category} onChange={setCategory} label="Filter by category" />
          </div>
        </div>
      </section>

      <section className="pg-results" aria-label="Equipment">
        <div className="hm-wrap">
          <p className="pg-count" aria-live="polite">
            {results.length} {results.length === 1 ? "product" : "products"}
            {category !== ALL && <> in <strong>{category}</strong></>}
          </p>
          {results.length > 0 ? (
            <ul className="pg-grid">
              {results.map((item, index) => (
                <Reveal as="li" className="hm-product" delay={(index % 3) * 80} key={item.slug}>
                  <ProductCard item={item} showPrice />
                </Reveal>
              ))}
            </ul>
          ) : (
            <div className="pg-empty">
              <p>No equipment matches your search.</p>
              <button className="hm-btn hm-btn-ghost" type="button" onClick={() => { setQuery(""); setCategory(ALL); }}>
                Show all equipment
              </button>
            </div>
          )}
        </div>
      </section>

      <PageCta
        title="Can’t find the analyzer you need?"
        text="We can source other models from our partners. Tell us your test menu and daily volume and we’ll recommend the right fit."
      />
    </main>
  );
}
