import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#2563eb", // blue-600
          secondary: "#0ea5e9", // sky-500
          accent: "#f97316", // orange-500
          dark: "#1e293b", // slate-800
          light: "#f8fafc", // slate-50
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [forms, typography],
};
