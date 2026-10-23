import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      xs: "360px",
      sm: "390px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    },
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
          badgePurple: "#C084FC",
          green: "#30D1A6",
          footerMuted: "#B5BFD4",
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
