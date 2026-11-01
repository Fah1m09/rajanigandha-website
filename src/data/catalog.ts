import fs from "node:fs";
import path from "node:path";
import type { iEquipment } from "../types/Equipment";
import type { iReagent } from "../types/Reagent";

// Product files live in /content and are edited through the admin panel (/admin).
// They are read at build time (server only), so every admin save triggers a Netlify rebuild.
// Client components get products as props; import formatPrice from "./format" there.

function load<T extends { slug: string; published?: boolean; order?: number; name: string }>(folder: string): T[] {
  const dir = path.join(process.cwd(), "content", folder);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => ({
      ...JSON.parse(fs.readFileSync(path.join(dir, file), "utf8")),
      slug: file.replace(/\.json$/, ""),
    }) as T)
    .filter((item) => item.published !== false)
    .sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999) || a.name.localeCompare(b.name));
}

export const equipmentList = load<iEquipment>("equipment");

export const reagentList = load<iReagent>("reagents");

/** Finds a product by slug, or by the numeric ids old links used (/equipments/1). */
export const findEquipment = (id: string) =>
  equipmentList.find((item) => item.slug === id) ?? equipmentList.find((item) => String(item.order) === id);

export { formatPrice } from "./format";
