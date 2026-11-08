// Company facts used across the site. Keep these in one place so every section agrees.
const SINCE = 1989; // Spinreact partnership began in 1989

export const company = {
  name: "Rajanigandha International",
  since: SINCE,
  city: "Dhaka",
  phone: "01730376269",
  phones: ["01730376269", "01777799333"],
  email: "rajani@dhaka.net",
  address: ["Eastern Commercial Complex, 5th floor, Room 5/14", "73 Kakrail, Dhaka 1000, Bangladesh"],
  // TODO add full addresses for the other branches.
  branches: [
    { name: "Head office", city: "Dhaka", address: "Eastern Commercial Complex, 5th floor, Room 5/14, 73 Kakrail, Dhaka 1000" },
    { name: "Chittagong branch", city: "Chittagong", address: "" },
    { name: "Sylhet branch", city: "Sylhet", address: "" },
  ],
  sourcingCountries: ["Spain", "Italy", "Japan", "China", "India"],
  stats: [
    { value: new Date().getFullYear() - SINCE, suffix: "", label: "Years in diagnostics", note: "Serving laboratories since 1989." },
    // TODO confirm: older copy said both 400+ and 1300+ clients.
    { value: 1300, suffix: "+", label: "Healthcare providers", note: "Hospitals and diagnostic centres use our products." },
    { value: 29, suffix: "", label: "Branches", note: "Support teams across the country." },
    { value: 24, suffix: "/7", label: "Technical support", note: "Engineers on call every day of the year." },
  ],
  brands: [
    {
      name: "Spinreact",
      since: 1989,
      origin: "Spain",
      logo: "/img/spinlogo.png",
      href: "https://www.spinreact.com/",
      description: "Spanish maker of in-vitro diagnostic reagents and electro-medical equipment. We have represented Spinreact in Bangladesh since 1989.",
    },
    {
      name: "Microlab",
      since: 2008,
      origin: "India",
      logo: "/img/microlab.png",
      href: "https://www.microlab.co.in/",
      description: "Indian manufacturer of biochemistry analyzers, blood cell counters and clinical diagnostic products. Our partner since 2008.",
    },
    {
      name: "Jokoh",
      since: 1947,
      origin: "Japan",
      logo: "/img/jokoh.png",
      href: "https://www.jokoh.com/",
      description: "Japanese maker of electrolyte analyzers, medical consumables and IVD kits, and the first to add dialysis fluid measurement to its analyzers.",
    },
    {
      name: "Edif",
      since: 1987,
      origin: "Italy",
      logo: "/img/edif.png",
      href: "https://www.edif.business/",
      description: "Italian reagents for clinical chemistry, turbidimetry, immunology and electrophoresis, made for laboratories of every size and workload.",
    },
    {
      name: "Biotime",
      since: 2008,
      origin: "China",
      logo: "/img/biotime.png",
      href: "https://www.xiamenbiotime.com/",
      description: "Chinese high-tech company that develops and makes point-of-care testing (POCT) devices and reagents for fast in-vitro diagnostics.",
    },
    {
      name: "Motic",
      since: 1988,
      origin: "China",
      logo: "/img/motic.png",
      href: "https://www.motic.com/",
      description: "Began with compound microscopes and grew into digital microscopy, imaging software and research tools, adding brands like National and Swift.",
    }
  ],
};
