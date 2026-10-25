import { useMemo, useState } from "react";
import { iReagent } from "../../types/Reagent";
import ReagentData from "../../assets/reagentdb";

type SortKey = keyof iReagent;
const columns: { key: SortKey; label: string }[] = [
  { key: "Name", label: "Name" }, { key: "Category", label: "Category" },
  { key: "PacSize", label: "Pack Size" }, { key: "Price", label: "Price" },
];

export default function Reagent() {
  const [sortBy, setSortBy] = useState<SortKey>("Id");
  const [ascending, setAscending] = useState(true);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [filter, setFilter] = useState("");
  const categories = ["Clinical Chemistry", "Serology", "Immuno Chemistry", "Blood Grouping"];
  const filtered = useMemo(() => filter ? ReagentData.filter((item) => item.Category === filter) : ReagentData, [filter]);
  const rows = useMemo(() => [...filtered].sort((a, b) => {
    const left = a[sortBy]; const right = b[sortBy];
    const result = typeof left === "number" && typeof right === "number" ? left - right : String(left).localeCompare(String(right));
    return ascending ? result : -result;
  }), [filtered, sortBy, ascending]);
  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
  return (
    <main className="equipment-container">
      <div className="mb-4 flex justify-end"><label className="w-full sm:w-72"><span className="mb-1 block text-sm font-medium">Select Category</span><select className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-white" value={filter} onChange={(event) => { setFilter(event.target.value); setPage(0); }}><option value="">All</option>{categories.map((category) => <option key={category} value={category}>{category}</option>)}</select></label></div>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full min-w-[46rem] border-collapse text-left text-sm" aria-label="Reagents">
          <thead className="bg-black text-white"><tr>{columns.map(({ key, label }) => <th className="px-4 py-3" key={key} scope="col"><button className="font-semibold hover:underline" onClick={() => { setAscending(sortBy === key ? !ascending : true); setSortBy(key); }}>{label}{sortBy === key ? (ascending ? " ↑" : " ↓") : ""}</button></th>)}</tr></thead>
          <tbody>{rows.slice(page * pageSize, (page + 1) * pageSize).map((row, index) => <tr className={index % 2 === 0 ? "bg-slate-100 dark:bg-slate-800" : "bg-white dark:bg-slate-900"} key={row.Id}><th className="px-4 py-3 font-medium" scope="row">{row.Name}</th><td className="px-4 py-3">{row.Category}</td><td className="px-4 py-3">{row.PacSize}</td><td className="px-4 py-3">{row.Price}</td></tr>)}</tbody>
        </table>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-end gap-3 text-sm"><label>Rows per page <select className="ml-1 rounded border border-slate-300 bg-white px-2 py-1 text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-white" value={pageSize} onChange={(event) => { setPageSize(Number(event.target.value)); setPage(0); }}>{[10, 20, 30].map((size) => <option key={size} value={size}>{size}</option>)}</select></label><span>{rows.length === 0 ? 0 : page * pageSize + 1}–{Math.min((page + 1) * pageSize, rows.length)} of {rows.length}</span><button className="rounded px-2 py-1 disabled:opacity-40" disabled={page === 0} onClick={() => setPage(page - 1)}>Previous</button><button className="rounded px-2 py-1 disabled:opacity-40" disabled={page + 1 >= pageCount} onClick={() => setPage(page + 1)}>Next</button></div>
    </main>
  );
}
