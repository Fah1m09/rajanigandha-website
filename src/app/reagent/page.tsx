import type { Metadata } from "next";
import Reagent from "../../views/reagent";
import { reagentList } from "../../data/catalog";

export const metadata: Metadata = {
  title: "Diagnostic reagents",
  description: "Reagents for clinical chemistry, serology, immunochemistry and blood grouping, with pack sizes and trade prices.",
};

export default function Page() {
  return <Reagent reagentList={reagentList} />;
}
