import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EquipmentDetails from "../../../views/equipmentDetails";
import JsonLd from "../../../components/JsonLd";
import { equipmentList, findEquipment } from "../../../data/catalog";
import { breadcrumbSchema, clip, equipmentImages, equipmentPath, pageMeta, productSchema } from "../../../data/seo";

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
  const lead = `${equipment.brand} ${equipment.name} in Bangladesh.`;
  const images = equipmentImages(equipment);
  return pageMeta({
    title: `${equipment.name} by ${equipment.brand}`,
    description: clip(`${lead} ${equipment.summary ?? "Price, specifications and service from Rajanigandha International."}`),
    // Old numeric links point search engines to the slug address
    path: equipmentPath(equipment),
    images: images.map((url, index) => ({ url, alt: images.length > 1 ? `${equipment.name}, image ${index + 1}` : equipment.name })),
  });
}

export default async function Page({ params }: Props) {
  const equipment = findEquipment((await params).equipmentId);
  if (!equipment) notFound();
  return (
    <>
      <JsonLd data={productSchema(equipment)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Equipment", path: "/equipments" },
          { name: equipment.name, path: equipmentPath(equipment) },
        ])}
      />
      <EquipmentDetails equipment={equipment} />
    </>
  );
}
