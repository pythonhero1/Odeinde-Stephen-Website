import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          bg: "#07090D",
          surface: "#0D1117",
          card: "#121820",
          border: "#1E2633",
          accent: "#3B82F6",
          accentHover: "#2563EB",
          muted: "#9CA3AF",
        },
      },
      fontFamily: {
        sans: ["var(--font-work-sans)", "sans-serif"],
        heading: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
