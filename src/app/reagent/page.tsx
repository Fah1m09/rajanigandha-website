import type { Metadata } from "next";
import Reagent from "../../views/reagent";
import { reagentList } from "../../data/catalog";
import { pageMeta } from "../../data/seo";

export const metadata: Metadata = pageMeta({
  title: "Diagnostic reagents in Bangladesh",
  description: "Spinreact reagents for clinical chemistry, serology, immunochemistry and blood grouping in Bangladesh, with pack sizes and trade prices.",
  path: "/reagent",
});

export default function Page() {
  return <Reagent reagentList={reagentList} />;
}
