import type { Metadata } from "next";
import Equipment from "../../views/equipment";
import JsonLd from "../../components/JsonLd";
import { equipmentList } from "../../data/catalog";
import { absoluteUrl, clip, equipmentPath, listText, pageMeta, unique } from "../../data/seo";

const brands = unique(equipmentList.map((item) => item.brand));

export const metadata: Metadata = pageMeta({
  title: "Diagnostic lab equipment in Bangladesh",
  description: clip(
    `${equipmentList.length} diagnostic analyzers from ${listText(brands)}. Supplied and serviced in Bangladesh.`,
  ),
  path: "/equipments",
});

const itemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Diagnostic equipment",
  numberOfItems: equipmentList.length,
  itemListElement: equipmentList.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    url: absoluteUrl(equipmentPath(item)),
  })),
};

export default function Page() {
  return (
    <>
      <JsonLd data={itemList} />
      <Equipment equipmentList={equipmentList} />
    </>
  );
}
