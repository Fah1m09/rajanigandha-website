import type { Metadata } from "next";
import Contact from "../../views/contact";
import { pageMeta } from "../../data/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact us",
  description: "Call, email or visit Rajanigandha International in Kakrail, Dhaka for equipment quotes, reagent orders and 24/7 technical support.",
  path: "/contact",
});

export default function Page() {
  return <Contact />;
}
