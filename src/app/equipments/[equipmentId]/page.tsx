import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EquipmentDetails from "../../../views/equipmentDetails";
import { equipmentList, findEquipment } from "../../../data/catalog";

type Props = { params: Promise<{ equipmentId: string }> };

// Only the pages built below exist; anything else gets the 404 page.
export const dynamicParams = false;

// One page per product slug, plus the numeric ids old links used (/equipments/1).
export function generateStaticParams() {
  const ids = new Set<string>();
  for (const item of equipmentList) {
    ids.add(item.slug);
    if (item.order != null) ids.add(String(item.order));
  }
  return [...ids].map((equipmentId) => ({ equipmentId }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const equipment = findEquipment((await params).equipmentId);
  if (!equipment) return {};
  return {
    title: equipment.name,
    description: equipment.summary ?? `${equipment.name} by ${equipment.brand}: ${equipment.category}.`,
    openGraph: equipment.image ? { images: [equipment.image] } : undefined,
  };
}

export default async function Page({ params }: Props) {
  const equipment = findEquipment((await params).equipmentId);
  if (!equipment) notFound();
  return <EquipmentDetails equipment={equipment} />;
}
