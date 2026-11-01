export const formatPrice = (price?: number | null) =>
  price ? `৳ ${price.toLocaleString("en-IN")}` : null;
