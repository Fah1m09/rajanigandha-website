import type { Metadata } from "next";
import Equipment from "../../views/equipment";
import { equipmentList } from "../../data/catalog";

export const metadata: Metadata = {
  title: "Diagnostic equipment",
  description: "Diagnostic analyzers and instruments from Spinreact, Microlab and more, supplied and serviced across Bangladesh.",
};

export default function Page() {
  return <Equipment equipmentList={equipmentList} />;
}
