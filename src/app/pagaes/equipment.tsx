import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import EquipmetsData from "../../assets/db";

const categories = ["Full Auto BioChemistry", "Auto Hematology Analyzer", "Semi Auto BioChemistry", "Electrolite", "Others"];

export default function Equipment() {
  const [filter, setFilter] = useState("");
  const equipment = useMemo(() => filter ? EquipmetsData.filter((item) => item.Category === filter) : EquipmetsData, [filter]);
  return (
    <main className="equipment-container">
      <div className="mb-6 flex justify-end">
        <label className="w-full sm:w-72"><span className="mb-1 block text-sm font-medium">Select Category</span><select className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-white" value={filter} onChange={(event) => setFilter(event.target.value)}><option value="">All</option>{categories.map((category) => <option key={category} value={category}>{category}</option>)}</select></label>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {equipment.map((item) => <article className="overflow-hidden rounded-lg bg-white text-slate-900 shadow-md transition-colors hover:shadow-xl dark:bg-slate-800 dark:text-white" key={item.Id}>
          <Link className="equipment-title block" to={`/equipments/${item.Id}`}>
            <img className="h-64 w-full object-contain p-3" src={item.Image} alt={item.Name} />
            <div className="p-4">{item.Name}<br /><span className="equipment-category">{item.Category}</span><span className="equipment-brand">{item.Brand}</span><p className="equipment-price">{item.Price != 0 ? item.Price : "Call for price"}</p></div>
          </Link>
        </article>)}
      </div>
    </main>
  );
}
