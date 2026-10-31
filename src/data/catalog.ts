import type { iEquipment } from "../types/Equipment";
import type { iReagent } from "../types/Reagent";

// Product files live in /content and are edited through the admin panel (/admin).
// Vite bundles them at build time, so every admin save triggers a Netlify rebuild.
type Raw<T> = Omit<T, "slug">;

function load<T extends { slug: string; published?: boolean; order?: number; name: string }>(
  files: Record<string, Raw<T>>,
): T[] {
  return Object.entries(files)
    .map(([path, data]) => ({ ...data, slug: path.split("/").pop()!.replace(/\.json$/, "") }) as T)
    .filter((item) => item.published !== false)
    .sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999) || a.name.localeCompare(b.name));
}

export const equipmentList = load<iEquipment>(
  import.meta.glob("/content/equipment/*.json", { eager: true, import: "default" }),
);

export const reagentList = load<iReagent>(
  import.meta.glob("/content/reagents/*.json", { eager: true, import: "default" }),
);

export const formatPrice = (price?: number | null) =>
  price ? `৳ ${price.toLocaleString("en-IN")}` : null;
