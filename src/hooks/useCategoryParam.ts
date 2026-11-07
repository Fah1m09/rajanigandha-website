"use client";

import { usePathname, useRouter } from "next/navigation";

/**
 * Returns a setter that writes ?category= (and optionally &group=) to the URL
 * without adding history or scrolling.
 */
export function useSetCategoryParam() {
  const router = useRouter();
  const pathname = usePathname();
  return (category: string | null, group?: string | null) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (category && group) params.set("group", group);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };
}
