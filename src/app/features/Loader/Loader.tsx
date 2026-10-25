import React from "react";
import { useAppSelector } from "../../../hooks/useReduxHooks";

function Loader() {
  const loading = useAppSelector((state) => state.loader.loading);

  if (!loading) {
    return undefined;
  }
  return (
    <div className="fixed inset-0 z-[1050] flex items-center justify-center bg-black/50 text-white" role="status" aria-label="Loading">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/30 border-t-white" />
    </div>
  );
}

export default Loader;
