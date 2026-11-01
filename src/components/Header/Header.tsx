import { useEffect, useState, type CSSProperties } from "react";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

type HeaderProps = {
  colorMode: { toggleColorMode: () => void };
  mode: "light" | "dark";
};

const menuItems = [
  { name: "Home", path: "/" },
  { name: "Equipment", path: "/equipments" },
  { name: "Reagents", path: "/reagent" },
  { name: "Contact", path: "/contact" },
];

export default function Header({ colorMode, mode }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header
      className={`sh${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}
      onKeyDown={(event) => { if (event.key === "Escape") close(); }}
    >
      <div className="sh-bar">
        <Link className="sh-brand" to="/" onClick={close} aria-label="Rajanigandha International — home">
          <img src="/img/rajanigondha.png" alt="" />
          <span>
            Rajanigandha
            <small>International</small>
          </span>
        </Link>

        <nav className="sh-nav" id="site-nav" aria-label="Main">
          {menuItems.map((item, index) => (
            <NavLink
              className="sh-link"
              end={item.path === "/"}
              key={item.path}
              onClick={close}
              style={{ "--i": index } as CSSProperties}
              to={item.path}
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="sh-actions">
          <button
            className="theme-toggle sh-icon-btn"
            onClick={colorMode.toggleColorMode}
            aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
            aria-pressed={mode === "dark"}
            data-mode={mode}
            title={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
            type="button"
          >
            <Sun className="theme-toggle-icon theme-toggle-sun" aria-hidden="true" />
            <Moon className="theme-toggle-icon theme-toggle-moon" aria-hidden="true" />
          </button>
          <Link className="sh-cta" to="/contact" onClick={close}>
            Get a quote <ArrowUpRight aria-hidden="true" />
          </Link>
          <button
            className="sh-icon-btn sh-burger"
            aria-controls="site-nav"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((isOpen) => !isOpen)}
            type="button"
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  );
}
