import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#FFFDF9",
        surface: "#FFFFFF",
        cream: "#FDF7EE",
        "border-warm": "#F3ECE4",
        ink: "#2D2A32",
        "ink-muted": "#5C5566",
        mint: {
          DEFAULT: "#059669",
          deep: "#047857", // >= 5.48:1 contrast with #FFFFFF
          ink: "#065F46",  // >= 7.0:1 contrast on #D1FAE5
          soft: "#D1FAE5",
        },
        blush: {
          DEFAULT: "#DB2777", // >= 4.60:1 contrast with #FFFFFF
          deep: "#BE185D",
          ink: "#9D174D",
          soft: "#FCE7F3",
        },
        lavender: {
          DEFAULT: "#7C3AED", // >= 5.70:1 contrast with #FFFFFF
          deep: "#6D28D9",
          ink: "#5B21B6",
          soft: "#EDE9FE",
        },
        danger: {
          DEFAULT: "#DC2626", // >= 4.83:1 contrast with #FFFFFF
          ink: "#B91C1C",
          soft: "#FEE2E2",
        },
      },
      fontFamily: {
        display: ["var(--font-nunito)", "ui-rounded", "system-ui", "sans-serif"],
        sans: ["var(--font-jakarta)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        cozy: "0 8px 24px -6px rgba(45, 42, 50, 0.06), 0 2px 8px -2px rgba(219, 39, 119, 0.04)",
        "cozy-hover": "0 14px 32px -8px rgba(45, 42, 50, 0.1), 0 4px 12px -2px rgba(5, 150, 105, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
