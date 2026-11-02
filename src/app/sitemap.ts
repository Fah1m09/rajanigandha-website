import type { MetadataRoute } from "next";
import { equipmentList } from "../data/catalog";
import { absoluteUrl, equipmentImages, equipmentPath } from "../data/seo";

// Built once into /out/sitemap.xml by the static export
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "/", priority: 1 },
    { path: "/equipments", priority: 0.9 },
    { path: "/reagent", priority: 0.8 },
    { path: "/contact", priority: 0.6 },
  ].map(({ path, priority }) => ({ url: absoluteUrl(path), changeFrequency: "weekly" as const, priority }));

  // Only the slug address for each product; the old numeric links are duplicates
  const products = equipmentList.map((item) => ({
    url: absoluteUrl(equipmentPath(item)),
    changeFrequency: "monthly" as const,
    priority: item.featured ? 0.8 : 0.7,
    images: equipmentImages(item).map(absoluteUrl),
  }));

  return [...pages, ...products];
}
