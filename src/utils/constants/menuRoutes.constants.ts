import AboutUs from "../../app/pagaes/aboutus";
import Contact from "../../app/pagaes/contact";
import Equipment from "../../app/pagaes/equipment";
import home from "../../app/pagaes/home";
import Reagent from "../../app/pagaes/reagent";
import { Menu } from "../../types/Menu";

export const menus: Menu[] = [
  {
    name: "Home",
    path: "/home",
    component: home,
  },
  {
    name: "Equipment",
    path: "/equipment",
    component: Equipment,
  },
  {
    name: "Reagent",
    path: "/reagent",
    component: Reagent,
  },
  {
    name: "Contact",
    path: "/contact",
    component: Contact,
  },
  {
    name: "AboutUs",
    path: "/aboutus",
    component: AboutUs,
  },
];
