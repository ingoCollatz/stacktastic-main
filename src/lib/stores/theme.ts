import { writable, type Writable } from "svelte/store";
import { browser } from "$app/environment";

export type Theme = "light" | "dark";

interface ThemeStore extends Writable<Theme> {
  toggle: () => void;
}

function createTheme(): ThemeStore {
  const { subscribe, set, update } = writable<Theme>("light");

  return {
    subscribe,
    set,
    update,
    toggle: () => {
      update((theme) => {
        const newTheme = theme === "light" ? "dark" : "light";

        if (browser) {
          localStorage.setItem("theme", newTheme);
          // Update document class for Tailwind
          document.documentElement.classList.remove("light", "dark");
          document.documentElement.classList.add(newTheme);
        }

        return newTheme;
      });
    },
  };
}

export const theme = createTheme();

// Initialize theme from localStorage and system preference
if (browser) {
  const stored = localStorage.getItem("theme");
  const systemPreference = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;

  let initialTheme: Theme;

  if (stored === "light" || stored === "dark") {
    initialTheme = stored;
  } else {
    initialTheme = systemPreference ? "dark" : "light";
  }

  // Apply initial theme
  theme.set(initialTheme);
  localStorage.setItem("theme", initialTheme);
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(initialTheme);
}
