// Company facts used across the site. Keep these in one place so every section agrees.
const SINCE = 1990; // Spinreact partnership began in 1990

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
  sourcingCountries:["Spain", "Italy", "Japan", "China", "India"],
  stats: [
    { value: new Date().getFullYear() - SINCE, suffix: "", label: "Years in diagnostics", note: "Serving laboratories since 1990." },
    // TODO confirm: older copy said both 400+ and 1300+ clients.
    { value: 400, suffix: "+", label: "Healthcare providers", note: "Hospitals and diagnostic centres use our products." },
    { value: 29, suffix: "", label: "Branches", note: "Support teams across the country." },
    { value: 24, suffix: "/7", label: "Technical support", note: "Engineers on call every day of the year." },
  ],
  brands: [
    {
      name: "Spinreact",
      since: 1990,
      origin: "Spain",
      logo: "/img/spinlogo.png",
      href: "https://www.spinreact.com/",
      description: "In-vitro diagnostic reagents and electro-medical equipment. We have represented Spinreact in Bangladesh since 1990.",
    },
    {
      name: "Microlab",
      since: 2008,
      origin: "India",
      logo: "/img/microlab.png",
      href: "https://www.microlab.co.in/",
      description: "Biochemistry analyzers, blood cell counters and clinical diagnostic products. Our partnership began in 2008.",
    },
  ],
};
