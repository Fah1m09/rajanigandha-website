"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { initAnalytics, trackPageView } from "../services/analytics";

// Loads the tags once, then sends a page view on first load and on every route change.
// Uses useSearchParams, so the layout renders it inside <Suspense>.
export default function RouteTracker() {
  const pathname = usePathname();
  const search = useSearchParams().toString();

  useEffect(() => {
    initAnalytics();
    // Wait a tick so Next can update document.title for the new page first.
    const timer = window.setTimeout(() => trackPageView(pathname + (search ? `?${search}` : "")), 0);
    return () => window.clearTimeout(timer);
  }, [pathname, search]);

  return null;
}
