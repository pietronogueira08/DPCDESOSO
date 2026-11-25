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
        cream: "#FDF8F0",
        "border-warm": "#F1E8DF",
        ink: "#26232B",
        "ink-secondary": "#575061",
        mint: {
          DEFAULT: "#047857", // >= 5.48:1 with #FFFFFF
          ink: "#065F46",     // >= 7.0:1 on #D1FAE5
          soft: "#D1FAE5",
          progress: "#10B981",
        },
        "sky-med": {
          DEFAULT: "#0369A1", // >= 5.75:1 with #FFFFFF
          ink: "#075985",     // >= 6.4:1 on #E0F2FE
          soft: "#E0F2FE",
          progress: "#0EA5E9",
        },
        berry: {
          DEFAULT: "#6D28D9", // >= 7.0:1 with #FFFFFF
          ink: "#5B21B6",     // >= 7.1:1 on #EDE9FE
          soft: "#EDE9FE",
          progress: "#8B5CF6",
        },
        "rose-mimo": {
          DEFAULT: "#BE185D", // >= 5.8:1 with #FFFFFF
          ink: "#9D174D",     // >= 6.8:1 on #FCE7F3
          soft: "#FCE7F3",
          heart: "#EC4899",
        },
        "amber-trap": {
          DEFAULT: "#B45309", // >= 5.0:1 with #FFFFFF
          ink: "#92400E",     // >= 6.7:1 on #FEF3C7
          soft: "#FEF3C7",
          border: "#FDE68A",
        },
        crimson: {
          DEFAULT: "#B91C1C",
          soft: "#FEE2E2",
        },
      },
      fontFamily: {
        display: ["var(--font-nunito)", "ui-rounded", "system-ui", "sans-serif"],
        sans: ["var(--font-jakarta)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        kawaii:
          "0 10px 28px -8px rgba(38, 35, 43, 0.06), 0 3px 10px -2px rgba(236, 72, 153, 0.05)",
        "kawaii-hover":
          "0 16px 36px -8px rgba(38, 35, 43, 0.1), 0 6px 16px -3px rgba(16, 185, 129, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
