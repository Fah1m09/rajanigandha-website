export type iPackSize = {
  size: string;
  code?: string;
  tradePrice?: number | null;
};

export type iReagent = {
  slug: string;
  name: string;
  category: string;
  /** Group inside the category, as on Spinreact's site (e.g. "Enzymes" in Clinical Chemistry). */
  subcategory?: string;
  brand?: string;
  method?: string;
  packSizes: iPackSize[];
  published?: boolean;
  order?: number;
};
