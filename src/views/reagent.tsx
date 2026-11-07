"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, ArrowUpDown, ArrowUpRight } from "lucide-react";
import type { iReagent } from "../types/Reagent";
import { formatPrice } from "../data/format";
import { CategoryTabs, PageCta, SearchBox } from "../components/ui";
import { useSetCategoryParam } from "../hooks/useCategoryParam";

// One table row per pack size, so each size can carry its own trade price.
type Row = {
  key: string; name: string; method: string; category: string; subcategory: string; size: string; code: string; price: number;
};
type SortKey = "name" | "category" | "size" | "price";

const ALL = "All";
// Sidebar values for subgroups are "Category::Subgroup"; plain categories are just "Category".
const SEP = "::";

const columns: { key: SortKey; label: string }[] = [
  { key: "name", label: "Reagent" },
  { key: "category", label: "Category" },
  { key: "size", label: "Pack size" },
  { key: "price", label: "Trade price" },
];

const quoteLink = (row: Row) => {
  const details = [row.method, row.size, row.code && `Ref. ${row.code}`].filter(Boolean).join(", ");
  return `/contact?subject=${encodeURIComponent(`Quote request: ${row.name} (${details})`)}`;
};

type Props = { reagentList: iReagent[] };

type Requested = { category: string | null; group: string | null };

// The pre-rendered HTML shows every reagent; the ?category=&group= filter is applied in the browser.
export default function Reagent(props: Props) {
  return (
    <Suspense fallback={<Catalog {...props} requested={{ category: null, group: null }} />}>
      <CatalogFromUrl {...props} />
    </Suspense>
  );
}

function CatalogFromUrl(props: Props) {
  const params = useSearchParams();
  return <Catalog {...props} requested={{ category: params.get("category"), group: params.get("group") }} />;
}

function Catalog({ reagentList, requested }: Props & { requested: Requested }) {
  const allRows: Row[] = useMemo(() => reagentList.flatMap((reagent) =>
    reagent.packSizes.map((pack, index) => ({
      key: `${reagent.slug}-${index}`,
      name: reagent.name,
      method: reagent.method ?? "",
      category: reagent.category,
      subcategory: reagent.subcategory ?? "",
      size: pack.size,
      code: pack.code ?? "",
      price: pack.tradePrice ?? 0,
    })),
  ), [reagentList]);
  // Each category with its subgroups, in catalogue order.
  const tree = useMemo(() => {
    const map = new Map<string, Map<string, number>>();
    for (const item of reagentList) {
      const subs = map.get(item.category) ?? new Map<string, number>();
      if (item.subcategory) subs.set(item.subcategory, (subs.get(item.subcategory) ?? 0) + 1);
      map.set(item.category, subs);
    }
    return map;
  }, [reagentList]);

  const category = requested.category && tree.has(requested.category) ? requested.category : ALL;
  const group = category !== ALL && requested.group && tree.get(category)?.has(requested.group) ? requested.group : null;

  // Each category's chevron shows or hides its subgroups. Until the visitor toggles one,
  // only the selected category is open.
  const [toggled, setToggled] = useState<Record<string, boolean>>({});
  const isOpen = (name: string) => toggled[name] ?? name === category;
  const toggle = (name: string) => setToggled((prev) => ({ ...prev, [name]: !isOpen(name) }));

  const categoryOptions = [
    { value: ALL, label: "All reagents", count: reagentList.length },
    ...Array.from(tree, ([name, subs]) => {
      const open = isOpen(name);
      return [
        {
          value: name,
          label: name,
          count: reagentList.filter((item) => item.category === name).length,
          ...(subs.size > 0 && { expanded: open }),
          current: !open && name === category && group !== null,
        },
        ...(open
          ? Array.from(subs, ([sub, count]) => ({ value: `${name}${SEP}${sub}`, label: sub, count, sub: true }))
          : []),
      ];
    }).flat(),
  ];
  const selected = group ? `${category}${SEP}${group}` : category;
  const setCategoryParam = useSetCategoryParam();
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortKey | null>(null);
  const [ascending, setAscending] = useState(true);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const filtered = allRows.filter((row) =>
      (category === ALL || row.category === category)
      && (!group || row.subcategory === group)
      && (!needle || `${row.name} ${row.method} ${row.size} ${row.code}`.toLowerCase().includes(needle)));
    if (!sortBy) return filtered;
    return [...filtered].sort((a, b) => {
      const left = a[sortBy]; const right = b[sortBy];
      const result = typeof left === "number" && typeof right === "number"
        ? left - right
        : String(left).localeCompare(String(right));
      return ascending ? result : -result;
    });
  }, [allRows, category, group, query, sortBy, ascending]);

  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
  const current = Math.min(page, pageCount - 1);
  const visible = rows.slice(current * pageSize, (current + 1) * pageSize);

  const setCategory = (value: string) => {
    const [name, sub] = value.split(SEP);
    setCategoryParam(name === ALL ? null : name, sub ?? null);
    // Picking a category opens its subgroups
    if (name !== ALL) setToggled((prev) => ({ ...prev, [name]: true }));
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
          <p className="pg-lead pg-rise">
            {reagentList.length} reagent lines in {allRows.length} pack sizes for clinical chemistry,
            serology, immunochemistry, blood grouping and dedicated analyzer lines.
          </p>
        </div>
      </section>

      <section className="pg-results" aria-label="Reagents">
        <div className="hm-wrap pg-catalog">
          <aside className="pg-sidebar pg-rise" aria-label="Search and filter">
            <SearchBox value={query} onChange={(value) => { setQuery(value); setPage(0); }} label="Search reagents" />
            <p className="pg-sidebar-title">Categories</p>
            <CategoryTabs
              options={categoryOptions}
              value={selected}
              onChange={setCategory}
              onToggle={toggle}
              label="Filter by category"
            />
          </aside>

          <div className="pg-catalog-main">
            <p className="pg-count" aria-live="polite">
              {rows.length} {rows.length === 1 ? "pack size" : "pack sizes"}
              {category !== ALL && <> in <strong>{category}{group && ` › ${group}`}</strong></>}
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
                        <th scope="row">
                          {row.name}
                          {row.method && <span className="pg-table-sub">{row.method}</span>}
                        </th>
                        <td data-label="Category">
                          <span className="pg-tag">{row.category}</span>
                          {row.subcategory && <span className="pg-table-sub">{row.subcategory}</span>}
                        </td>
                        <td data-label="Pack size">
                          {row.size}
                          {row.code && <span className="pg-table-sub">Ref. {row.code}</span>}
                        </td>
                        <td data-label="Trade price">
                          {formatPrice(row.price) ?? <span className="pg-muted">On request</span>}
                        </td>
                        <td className="pg-table-action">
                          <Link href={quoteLink(row)} aria-label={`Request a quote for ${row.name}, ${row.size}`}>
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
        </div>
      </section>

      <PageCta
        title="Need reagents for your analyzer?"
        text="Tell us your analyzer model and monthly test volume. We’ll confirm compatibility, pack sizes and pricing."
      />
    </main>
  );
}
