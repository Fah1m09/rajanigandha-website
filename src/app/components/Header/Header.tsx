import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

type HeaderProps = {
  colorMode: { toggleColorMode: () => void };
  mode: "light" | "dark";
};

const menuItems = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "Equipments", path: "/equipments" },
  { id: 3, name: "Reagents", path: "/reagent" },
  { id: 4, name: "Contact US", path: "/contact" },
  { id: 5, name: "News", path: "/news" },
];

export default function Header({ colorMode, mode }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const activeLink = mode === "dark"
    ? "bg-slate-800 text-white"
    : "bg-white text-[#1976d2]";

  return (
    <header className={`text-white dark:text-blue-50 shadow-md transition-colors duration-500 ${mode === "dark" ? "bg-slate-950" : "bg-[#1976d2]"}`}>
      <div className="mx-auto flex min-h-16 max-w-7xl flex-wrap items-center gap-4 px-4 py-2 md:flex-nowrap">
        <img className="header-logo" src="/img/rajanigondha.png" alt="Rajanigandha Logo" />
        <Link className="header-text hidden flex-1 text-white md:flex" to="/">
          Rajanigandha International
        </Link>

        <button
          className="ml-auto rounded p-2 hover:bg-white/15 md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((isOpen) => !isOpen)}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <nav className={`${open ? "flex" : "hidden"} w-full flex-col gap-2 md:ml-auto md:flex md:w-auto md:flex-row md:items-center`}>
          {menuItems.map((item) => (
            <div key={item.id} onClick={() => setOpen(false)}>
              <NavLink
                className={({ isActive }) => `link rounded-md px-3 py-2 font-medium transition-colors ${isActive ? activeLink : "text-white/90 hover:bg-white/15 hover:text-white"}`}
                to={item.path}
              >
                {item.name}
              </NavLink>
            </div>
          ))}
          <button
            className="theme-toggle rounded-md text-white/90 transition-colors hover:bg-white/15 hover:text-white"
            onClick={colorMode.toggleColorMode}
            aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
            aria-pressed={mode === "dark"}
            data-mode={mode}
            title={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
          >
            <Sun className="theme-toggle-icon theme-toggle-sun" aria-hidden="true" />
            <Moon className="theme-toggle-icon theme-toggle-moon" aria-hidden="true" />
          </button>
        </nav>
      </div>
    </header>
  );
}
