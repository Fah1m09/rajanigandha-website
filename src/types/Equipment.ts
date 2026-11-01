export type iEquipment = {
  slug: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  gallery?: string[];
  summary?: string;
  // Optional big-number tiles shown under the summary
  highlights?: { value: string; label: string }[];
  // Specs with a `group` are shown as grouped cards; without one they form a single list
  specs?: { label: string; value: string; group?: string }[];
  features?: string[];
  certifications?: string[];
  brochure?: string;
  tradePrice?: number | null;
  featured?: boolean;
  published?: boolean;
  order?: number;
};
