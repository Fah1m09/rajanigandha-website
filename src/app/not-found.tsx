import type { Metadata } from "next";
import MissingRoute from "../components/MissingRoute";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return <MissingRoute />;
}
