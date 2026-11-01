import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "../../services/analytics";

// Sends a page view on first load and on every route change.
export default function RouteTracker() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Wait a tick so the new page can set document.title first.
    const timer = window.setTimeout(() => trackPageView(pathname + search), 0);
    return () => window.clearTimeout(timer);
  }, [pathname, search]);

  return null;
}
