import { Link, useParams } from "react-router-dom";
import { equipmentList, formatPrice } from "../../data/catalog";

export default function EquipmentDetails() {
  const { equipmentId } = useParams();
  // Old links used numeric ids (/equipments/1); those map to the original display order.
  const equipment = equipmentList.find((item) => item.slug === equipmentId)
    ?? equipmentList.find((item) => String(item.order) === equipmentId);
  if (!equipment) return <main className="equipment-container">Equipment not found.</main>;

  const price = formatPrice(equipment.tradePrice);
  const specs = equipment.specs ?? [];
  const features = equipment.features ?? [];

  return (
    <main className="equipment-container grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_2fr]">
      <img className="max-h-[28rem] w-full rounded-lg bg-white object-contain p-4 shadow" src={equipment.image} alt={equipment.name} />
      <section>
        <h3>{equipment.name}</h3>
        <div className="my-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm dark:bg-slate-800">Category: {equipment.category}</span>
          <span className="rounded-full border border-slate-300 px-3 py-1 text-sm">Brand: {equipment.brand}</span>
        </div>
        {equipment.summary && <p className="mt-6">{equipment.summary}</p>}

        {specs.length > 0 && (
          <>
            <h5 className="mb-3 mt-10">Specifications</h5>
            <dl className="divide-y divide-slate-200 rounded-lg border border-slate-200 dark:divide-slate-700 dark:border-slate-700">
              {specs.map((spec) => (
                <div className="grid grid-cols-[minmax(0,1fr)_2fr] gap-4 px-4 py-2 text-sm" key={spec.label}>
                  <dt className="font-medium">{spec.label}</dt>
                  <dd>{spec.value}</dd>
                </div>
              ))}
            </dl>
          </>
        )}

        {features.length > 0 && (
          <>
            <h5 className="mb-3 mt-10">Key features</h5>
            <ul className="list-inside list-disc space-y-1">
              {features.map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
          </>
        )}

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <p className="font-semibold">{price ? `Trade price: ${price}` : "Contact us for pricing"}</p>
          <Link className="home-text-link" to="/contact">Request a quote →</Link>
          {equipment.brochure && (
            <a className="home-text-link" href={equipment.brochure} target="_blank" rel="noreferrer">Download brochure ↗</a>
          )}
        </div>
      </section>
    </main>
  );
}
