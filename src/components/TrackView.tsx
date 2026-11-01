"use client";

import { useEffect } from "react";
import { track } from "../services/analytics";

/** Sends one analytics event when mounted (and again if the event changes). */
export default function TrackView({ name, params }: { name: string; params: Record<string, unknown> }) {
  const key = JSON.stringify([name, params]);
  useEffect(() => {
    track(name, params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return null;
}
