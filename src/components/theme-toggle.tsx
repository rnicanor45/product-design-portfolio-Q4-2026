"use client";

import { useEffect, useSyncExternalStore } from "react";

type Theme = "system" | "light" | "dark";

const STORAGE_KEY = "theme";
const order: Theme[] = ["system", "light", "dark"];
const labels: Record<Theme, string> = {
  system: "System",
  light: "Light",
  dark: "Dark",
};

// Tiny pub/sub so same-tab writes (via setTheme below) notify this
// component immediately — a "storage" event alone only fires in *other*
// tabs, not the one that made the change.
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : "system";
  } catch {
    return "system";
  }
}

// Server (and pre-hydration client) render: always "system" — the inline
// script in layout.tsx has already set data-theme on <html> synchronously
// before paint if a preference was stored, so this mismatch never flashes.
function getServerSnapshot(): Theme {
  return "system";
}

function setTheme(theme: Theme) {
  try {
    if (theme === "system") {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, theme);
    }
  } catch {
    // Storage unavailable (private browsing, etc.) — DOM still updates via
    // the effect below for the rest of this page view.
  }
  listeners.forEach((listener) => listener());
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "system") {
    root.removeAttribute("data-theme");
  } else {
    root.setAttribute("data-theme", theme);
  }
}

/** Cycles system → light → dark → system, persisted to localStorage (the
 * inline script in layout.tsx reads the same key to avoid a flash on load). */
export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  function cycle() {
    setTheme(order[(order.indexOf(theme) + 1) % order.length]);
  }

  return (
    <button
      type="button"
      onClick={cycle}
      className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-fg hover:text-fg"
      aria-label={`Theme: ${labels[theme]}. Click to change.`}
    >
      <ThemeIcon theme={theme} />
      {labels[theme]}
    </button>
  );
}

function ThemeIcon({ theme }: { theme: Theme }) {
  if (theme === "light") {
    return (
      <svg aria-hidden width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    );
  }
  if (theme === "dark") {
    return (
      <svg aria-hidden width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" />
      </svg>
    );
  }
  return (
    <svg aria-hidden width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}
