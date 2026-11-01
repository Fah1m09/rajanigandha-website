import { useLayoutEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

// Opens every new page at the top. Back/forward (POP) is left alone so the browser
// can return you to where you were, and query-only changes (filters, search) don't jump.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useLayoutEffect(() => {
    if (navigationType === "POP") return;
    if (hash) {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
      return;
    }
    // "instant" skips any smooth-scroll CSS so the new page doesn't visibly scroll up
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash, navigationType]);

  return null;
}
