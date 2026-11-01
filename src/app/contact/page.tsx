import type { Metadata } from "next";
import Contact from "../../views/contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Call, email or message Rajanigandha International for quotes, product questions and technical support.",
};

export default function Page() {
  return <Contact />;
}
