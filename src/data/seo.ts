import type { Metadata } from "next";
import type { iEquipment } from "../types/Equipment";
import { company } from "./company";

// Main web address. Netlify sets URL during builds; SITE_URL overrides it (e.g. for a custom domain).
export const siteUrl = (process.env.SITE_URL || process.env.URL || "http://localhost:3000").replace(/\/$/, "");

export const absoluteUrl = (path: string) => (/^https?:/.test(path) ? path : `${siteUrl}${path.startsWith("/") ? "" : "/"}${path}`);

/** Phone in international format for structured data, e.g. 01730376269 -> +8801730376269 */
const intlPhone = (phone: string) => phone.replace(/^0/, "+880");

/** Cuts text at a word boundary so it fits a search result snippet. */
export function clip(text: string, max = 158) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.\s–-]+$/, "")}…`;
}

type PageMetaInput = { title: string | { absolute: string }; description: string; path: string; images?: { url: string; alt: string }[] };

/**
 * Title, description, canonical address and social share tags for one page.
 * Pages set their own openGraph, which replaces the layout's, so the shared fields are filled here.
 */
export function pageMeta({ title, description, path, images }: PageMetaInput): Metadata {
  const shareTitle = typeof title === "string" ? `${title} | ${company.name}` : title.absolute;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: company.name,
      locale: "en_BD",
      url: path,
      title: shareTitle,
      description,
      images,
    },
    twitter: { card: images?.length ? "summary_large_image" : "summary", title: shareTitle, description },
  };
}

/** Distinct values in first-seen order, e.g. every brand in the catalogue. */
export const unique = (values: string[]) => [...new Set(values.filter(Boolean))];

/** "A, B and C" */
export const listText = (items: string[]) =>
  items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;

// ——— Structured data (schema.org JSON-LD) ———

export const organizationId = `${siteUrl}/#organization`;

export function organizationSchema(brands: string[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness"],
        "@id": organizationId,
        name: company.name,
        url: siteUrl,
        logo: absoluteUrl("/img/rajanigondha.png"),
        email: company.email,
        telephone: intlPhone(company.phone),
        foundingDate: String(company.since),
        description: "Supplier of diagnostic laboratory equipment, reagents and technical service across Bangladesh.",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Eastern Commercial Complex, 5th floor, Room 5/14, 73 Kakrail",
          addressLocality: "Dhaka",
          postalCode: "1000",
          addressCountry: "BD",
        },
        areaServed: { "@type": "Country", name: "Bangladesh" },
        contactPoint: company.phones.map((phone) => ({
          "@type": "ContactPoint",
          telephone: intlPhone(phone),
          contactType: "sales",
          areaServed: "BD",
          availableLanguage: ["en", "bn"],
        })),
        brand: brands.map((name) => ({ "@type": "Brand", name })),
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: company.name,
        publisher: { "@id": organizationId },
      },
    ],
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export const equipmentPath = (item: iEquipment) => `/equipments/${item.slug}`;
export const equipmentImages = (item: iEquipment) => [item.image, ...(item.gallery ?? [])].filter(Boolean);

export function productSchema(item: iEquipment) {
  const url = absoluteUrl(equipmentPath(item));
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: item.name,
    url,
    sku: item.slug,
    category: item.category,
    description: item.summary || `${item.name} ${item.category.toLowerCase()} by ${item.brand}.`,
    brand: { "@type": "Brand", name: item.brand },
    image: equipmentImages(item).map(absoluteUrl),
    // Key specs as name/value pairs that search engines can read
    additionalProperty: (item.specs ?? []).map((spec) => ({ "@type": "PropertyValue", name: spec.label, value: spec.value })),
    ...(item.tradePrice
      ? {
        offers: {
          "@type": "Offer",
          url,
          price: item.tradePrice,
          priceCurrency: "BDT",
          availability: "https://schema.org/InStock",
          seller: { "@id": organizationId },
        },
      }
      : {}),
  };
}
