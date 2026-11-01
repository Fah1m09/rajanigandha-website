import type { NextConfig } from "next";

// Static export: `next build` writes plain HTML/CSS/JS to /out, which Netlify serves as-is.
// That keeps Netlify Forms, the /admin CMS and netlify/functions working exactly as before.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
