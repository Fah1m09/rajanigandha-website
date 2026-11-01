import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";
import "../tailwind.css";
import "../assets/scss/App.scss";
import "../assets/scss/brand.scss";
import "../assets/scss/home.scss";
import "../assets/scss/pages.scss";
import SiteShell from "../components/SiteShell";
import RouteTracker from "../components/RouteTracker";

export const metadata: Metadata = {
  // Netlify sets URL to the site's main address during builds; used for absolute share-image links.
  metadataBase: new URL(process.env.URL || "http://localhost:3000"),
  title: {
    default: "Rajanigandha International",
    template: "%s | Rajanigandha International",
  },
  description: "Diagnostic equipment, reagents and technical service for laboratories across Bangladesh.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SiteShell>{children}</SiteShell>
        {/* Reads the query string, so it must sit in Suspense for the static export */}
        <Suspense fallback={null}>
          <RouteTracker />
        </Suspense>
      </body>
    </html>
  );
}
