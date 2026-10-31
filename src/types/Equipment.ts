export type iEquipment = {
  slug: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  gallery?: string[];
  summary?: string;
  specs?: { label: string; value: string }[];
  features?: string[];
  brochure?: string;
  tradePrice?: number | null;
  featured?: boolean;
  published?: boolean;
  order?: number;
};
