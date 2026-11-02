import type { Metadata } from "next";
import HomePage from "../views/home";
import JsonLd from "../components/JsonLd";
import { equipmentList } from "../data/catalog";
import { clip, listText, organizationSchema, pageMeta, unique } from "../data/seo";

const brands = unique(equipmentList.map((item) => item.brand));

export const metadata: Metadata = pageMeta({
  title: { absolute: "Rajanigandha International | Diagnostic Equipment & Reagents in Bangladesh" },
  description: clip(
    `Diagnostic analyzers, reagents and 24/7 technical service for laboratories across Bangladesh since 1990. Brands include ${listText(brands.slice(0, 3))}.`,
  ),
  path: "/",
});

export default function Page() {
  return (
    <>
      <JsonLd data={organizationSchema(brands)} />
      <HomePage />
    </>
  );
}
