// src/context/ThemeContext.jsx
import { createContext, useEffect, useMemo, useState } from "react";
import { lightTheme, darkTheme, optimisticTheme, accessibleTheme } from "../themes";

export const ThemeContext = createContext();

const MAP = { light: lightTheme, dark: darkTheme, optimistic: optimisticTheme, accessible: accessibleTheme };
const DEFAULT = "optimistic";

function apply(theme, themeName) {
  const root = document.documentElement;
  Object.entries(theme).forEach(([k, v]) => root.style.setProperty(`--${k}`, v));
  root.dataset.theme = themeName;        // <-- so CSS can target [data-theme="accessible"]
  document.body.style.background = theme.bg;
  document.body.style.color = theme.text;
}

export function ThemeProvider({ children }) {
  const [themeName, setThemeName] = useState(localStorage.getItem("theme") || DEFAULT);
  const theme = useMemo(() => MAP[themeName] || MAP[DEFAULT], [themeName]);

  useEffect(() => {
    localStorage.setItem("theme", themeName);
    apply(theme, themeName);
  }, [themeName, theme]);

  return (
    <ThemeContext.Provider value={{ themeName, setThemeName, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}
