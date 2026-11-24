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
        navy: {
          DEFAULT: "#101D36",
          dark: "#0A1324",
          light: "#1B2E54",
          muted: "#243B6B",
        },
        cyan: {
          DEFAULT: "#13CDEB",
          light: "#48DAF1",
          dark: "#0EB0CA",
          glow: "rgba(19, 205, 235, 0.25)",
        },
        lightGrey: {
          DEFAULT: "#F5F7FA",
          subtle: "#EBF0F7",
          border: "#E2E8F0",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 20px -2px rgba(16, 29, 54, 0.06), 0 2px 6px -1px rgba(16, 29, 54, 0.04)",
        "card-hover": "0 12px 30px -4px rgba(16, 29, 54, 0.12), 0 4px 10px -2px rgba(16, 29, 54, 0.06)",
        cyan: "0 0 25px -5px rgba(19, 205, 235, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
