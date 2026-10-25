import { useParams } from "react-router-dom";
import EquipmetsData from "../../assets/db";

export default function EquipmentDetails() {
  const { equipmentId } = useParams();
  const equipment = EquipmetsData.find((item) => item.Id == equipmentId);
  if (!equipment) return <main className="equipment-container">Equipment not found.</main>;
  return (
    <main className="equipment-container grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_2fr]">
      <img className="max-h-[28rem] w-full rounded-lg bg-white object-contain p-4 shadow" src={equipment.Image} alt={equipment.Name} />
      <section>
        <h3>{equipment.Name}</h3>
        <div className="my-4 flex flex-wrap gap-2"><span className="rounded-full bg-slate-100 px-3 py-1 text-sm">Category: {equipment.Category}</span><span className="rounded-full border border-slate-300 px-3 py-1 text-sm">Brand: {equipment.Brand}</span></div>
        <h5 className="mb-5 mt-12">Details</h5>
        <ul className="list-inside list-disc space-y-1">{String(equipment.Description).split("\n").map((line, index) => <li key={`${index}-${line}`}>{line}</li>)}</ul>
      </section>
    </main>
  );
}
