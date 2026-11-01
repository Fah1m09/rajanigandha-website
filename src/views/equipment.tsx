import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { equipmentList } from "../../data/catalog";
import { Reveal } from "../components/home/motion";
import { FilterPills, PageCta, ProductCard, SearchBox } from "../components/ui";
import "../../assets/scss/home.scss";
import "../../assets/scss/pages.scss";

const ALL = "All";
const categoryOptions = [
  { value: ALL, label: "All equipment", count: equipmentList.length },
  ...Array.from(new Set(equipmentList.map((item) => item.category))).map((category) => ({
    value: category,
    label: category,
    count: equipmentList.filter((item) => item.category === category).length,
  })),
];

export default function Equipment() {
  const [params, setParams] = useSearchParams();
  const requested = params.get("category") ?? ALL;
  const category = categoryOptions.some((option) => option.value === requested) ? requested : ALL;
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return equipmentList.filter((item) =>
      (category === ALL || item.category === category)
      && (!needle || `${item.name} ${item.brand} ${item.category}`.toLowerCase().includes(needle)));
  }, [category, query]);

  const setCategory = (value: string) => setParams(value === ALL ? {} : { category: value }, { replace: true });

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
