import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#FAF8F4",
        "bg-warm": "#F5F0E8",
        "bg-card": "#FFFFFF",
        gold: {
          DEFAULT: "#9B7B4F",
          light: "#C8A882",
          dark: "#7A5F3A",
          muted: "#D4C4A8",
        },
        navy: {
          DEFAULT: "#2B4570",
          dark: "#1A2332",
          light: "#3D5A8A",
        },
        text: {
          primary: "#141C28",
          secondary: "#374151",
          muted: "#6B7280",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
