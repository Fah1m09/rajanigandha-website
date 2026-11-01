"use client";

import { useSearchParams } from "next/navigation";

// Read query params from url. Components using this must sit inside <Suspense>.
function useQuery() {
  return useSearchParams();
}

export default useQuery;
