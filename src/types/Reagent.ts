export type iPackSize = {
  size: string;
  code?: string;
  tradePrice?: number | null;
};

export type iReagent = {
  slug: string;
  name: string;
  category: string;
  brand?: string;
  method?: string;
  packSizes: iPackSize[];
  published?: boolean;
  order?: number;
};
