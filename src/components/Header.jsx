// src/components/Header.jsx
import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import logo from "../assets/logo.png"; // correct way with Vite

export default function Header() {
  const { themeName, setThemeName } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const btnRef = useRef(null);

  const THEMES = [
    { key: "light", label: "Light", icon: "☀️", swatch: { p: "#10b981", a: "#6ee7b7" } },
    { key: "dark", label: "Dark", icon: "🌙", swatch: { p: "#60a5fa", a: "#34d399" } },
    { key: "optimistic", label: "Pistachio", icon: "🥜", swatch: { p: "#93C572", a: "#BEE3A3" } },
    { key: "accessible", label: "Color-Safe", icon: "👁", swatch: { p: "#005A9C", a: "#FF7F0E" } },
  ];

  // Close on outside click / ESC
  useEffect(() => {
    function onDocClick(e) {
      if (!menuRef.current || !btnRef.current) return;
      if (menuRef.current.contains(e.target) || btnRef.current.contains(e.target)) return;
      setOpen(false);
    }
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header className="header">
      <div className="container nav">
        <div className="brand">
          <img src={logo} alt="Logo" /> {/* ✅ fixed */}
          <span>Amjad</span>
        </div>

        <nav>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </nav>

        {/* Theme dropdown */}
        <div className="theme-menu" ref={menuRef}>
          <button
            ref={btnRef}
            type="button"
            className="theme-toggle"
            aria-haspopup="menu"
            aria-expanded={open}
            aria-label="Change theme"
            onClick={() => setOpen((o) => !o)}
          >
            <svg className="palette" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 2a10 10 0 0 0-10 10 8 8 0 0 0 8 8h4a4 4 0 0 0 4-4c0-1.1-.9-2-2-2h-2a2 2 0 0 1-2-2c0-1.1.9-2 2-2h.5A5.5 5.5 0 0 0 12 2Zm-1 5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm5 1a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM7 12a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm2 5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
              />
            </svg>
            <span className="toggle-label">Theme</span>
          </button>

          {open && <div className="theme-backdrop" onClick={() => setOpen(false)} />}

          <ul className={`theme-list ${open ? "open" : ""}`} role="menu">
            {THEMES.map((t) => (
              <li key={t.key} role="none">
                <button
                  type="button"
                  role="menuitemradio"
                  aria-checked={themeName === t.key}
                  className={`theme-item ${themeName === t.key ? "active" : ""}`}
                  onClick={() => {
                    setThemeName(t.key);
                    setOpen(false);
                  }}
                >
                  <span className="item-left">
                    <span
                      className="swatch"
                      aria-hidden="true"
                      style={{
                        background: `linear-gradient(135deg, ${t.swatch.p}, ${t.swatch.a})`,
                      }}
                    />
                    <span className="item-label">
                      {t.icon} {t.label}
                    </span>
                  </span>
                  {themeName === t.key && (
                    <span className="item-check" aria-hidden="true">
                      ✓
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
