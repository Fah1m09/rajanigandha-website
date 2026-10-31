import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, ArrowUpDown, ArrowUpRight } from "lucide-react";
import { formatPrice, reagentList } from "../../data/catalog";
import { FilterPills, PageCta, SearchBox } from "../components/ui";
import "../../assets/scss/home.scss";
import "../../assets/scss/pages.scss";

// One table row per pack size, so each size can carry its own trade price.
type Row = { key: string; name: string; category: string; size: string; price: number };
type SortKey = "name" | "category" | "size" | "price";

const allRows: Row[] = reagentList.flatMap((reagent) =>
  reagent.packSizes.map((pack, index) => ({
    key: `${reagent.slug}-${index}`,
    name: reagent.name,
    category: reagent.category,
    size: pack.size,
    price: pack.tradePrice ?? 0,
  })),
);

const ALL = "All";
const categoryOptions = [
  { value: ALL, label: "All reagents", count: reagentList.length },
  ...Array.from(new Set(reagentList.map((item) => item.category))).map((category) => ({
    value: category,
    label: category,
    count: reagentList.filter((item) => item.category === category).length,
  })),
];

const columns: { key: SortKey; label: string }[] = [
  { key: "name", label: "Reagent" },
  { key: "category", label: "Category" },
  { key: "size", label: "Pack size" },
  { key: "price", label: "Trade price" },
];

const quoteLink = (row: Row) =>
  `/contact?subject=${encodeURIComponent(`Quote request: ${row.name} (${row.size})`)}`;

export default function Reagent() {
  const [params, setParams] = useSearchParams();
  const requested = params.get("category") ?? ALL;
  const category = categoryOptions.some((option) => option.value === requested) ? requested : ALL;
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortKey | null>(null);
  const [ascending, setAscending] = useState(true);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const filtered = allRows.filter((row) =>
      (category === ALL || row.category === category)
      && (!needle || `${row.name} ${row.size}`.toLowerCase().includes(needle)));
    if (!sortBy) return filtered;
    return [...filtered].sort((a, b) => {
      const left = a[sortBy]; const right = b[sortBy];
      const result = typeof left === "number" && typeof right === "number"
        ? left - right
        : String(left).localeCompare(String(right));
      return ascending ? result : -result;
    });
  }, [category, query, sortBy, ascending]);

  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
  const current = Math.min(page, pageCount - 1);
  const visible = rows.slice(current * pageSize, (current + 1) * pageSize);

  const setCategory = (value: string) => {
    setParams(value === ALL ? {} : { category: value }, { replace: true });
    setPage(0);
  };
  const sort = (key: SortKey) => {
    setAscending(sortBy === key ? !ascending : true);
    setSortBy(key);
  };

  return (
    <main className="hm pg">
      <section className="pg-hero" aria-labelledby="pg-title">
        <div className="hm-wrap">
          <p className="hm-eyebrow pg-rise">Reagent catalogue</p>
          <h1 className="pg-title pg-rise" id="pg-title">Diagnostic <em>reagents</em></h1>
          <div className="pg-hero-row pg-rise">
            <p className="pg-lead">
              {reagentList.length} reagent lines in {allRows.length} pack sizes for clinical chemistry,
              serology, immunochemistry and blood grouping.
            </p>
            <SearchBox value={query} onChange={(value) => { setQuery(value); setPage(0); }} label="Search reagents" />
          </div>
          <div className="pg-rise">
            <FilterPills options={categoryOptions} value={category} onChange={setCategory} label="Filter by category" />
          </div>
        </div>
      </section>

      <section className="pg-results" aria-label="Reagents">
        <div className="hm-wrap">
          <p className="pg-count" aria-live="polite">
            {rows.length} {rows.length === 1 ? "pack size" : "pack sizes"}
            {category !== ALL && <> in <strong>{category}</strong></>}
          </p>

          {rows.length > 0 ? (
            <div className="pg-table-card pg-rise">
              <table className="pg-table">
                <thead>
                  <tr>
                    {columns.map(({ key, label }) => {
                      const active = sortBy === key;
                      const Icon = !active ? ArrowUpDown : ascending ? ArrowUp : ArrowDown;
                      return (
                        <th
                          aria-sort={active ? (ascending ? "ascending" : "descending") : "none"}
                          key={key}
                          scope="col"
                        >
                          <button className={active ? "is-active" : ""} onClick={() => sort(key)} type="button">
                            {label} <Icon aria-hidden="true" />
                          </button>
                        </th>
                      );
                    })}
                    <th scope="col"><span className="sr-only">Quote</span></th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((row) => (
                    <tr key={row.key}>
                      <th scope="row">{row.name}</th>
                      <td data-label="Category"><span className="pg-tag">{row.category}</span></td>
                      <td data-label="Pack size">{row.size}</td>
                      <td data-label="Trade price">
                        {formatPrice(row.price) ?? <span className="pg-muted">On request</span>}
                      </td>
                      <td className="pg-table-action">
                        <Link to={quoteLink(row)} aria-label={`Request a quote for ${row.name}, ${row.size}`}>
                          Quote <ArrowUpRight aria-hidden="true" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="pg-empty">
              <p>No reagents match your search.</p>
              <button className="hm-btn hm-btn-ghost" type="button" onClick={() => { setQuery(""); setCategory(ALL); }}>
                Show all reagents
              </button>
            </div>
          )}

          {rows.length > 0 && (
            <div className="pg-pager">
              <label>
                Rows per page
                <select value={pageSize} onChange={(event) => { setPageSize(Number(event.target.value)); setPage(0); }}>
                  {[10, 20, 50].map((size) => <option key={size} value={size}>{size}</option>)}
                </select>
              </label>
              <span>
                {current * pageSize + 1}–{Math.min((current + 1) * pageSize, rows.length)} of {rows.length}
              </span>
              <div className="pg-pager-buttons">
                <button type="button" disabled={current === 0} onClick={() => setPage(current - 1)} aria-label="Previous page">
                  <ArrowLeft aria-hidden="true" />
                </button>
                <button type="button" disabled={current + 1 >= pageCount} onClick={() => setPage(current + 1)} aria-label="Next page">
                  <ArrowRight aria-hidden="true" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <PageCta
        title="Need reagents for your analyzer?"
        text="Tell us your analyzer model and monthly test volume. We’ll confirm compatibility, pack sizes and pricing."
      />
    </main>
  );
}
