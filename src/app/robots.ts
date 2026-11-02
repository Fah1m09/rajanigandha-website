import type { MetadataRoute } from "next";
import { absoluteUrl } from "../data/seo";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin/"] },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
