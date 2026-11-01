"use client";

import { usePathname, useRouter } from "next/navigation";

/** Returns a setter that writes ?category= to the URL without adding history or scrolling. */
export function useSetCategoryParam() {
  const router = useRouter();
  const pathname = usePathname();
  return (category: string | null) =>
    router.replace(category ? `${pathname}?category=${encodeURIComponent(category)}` : pathname, { scroll: false });
}
