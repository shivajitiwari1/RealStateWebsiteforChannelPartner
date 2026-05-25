import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#3B6CB5",
          dark: "#555566",
          accent: "#f0f6ff",
          light: "#e0ebff",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["DM Sans", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 16px 0 rgba(59,108,181,0.08)",
        "card-hover": "0 8px 32px 0 rgba(59,108,181,0.16)",
      },
    },
  },
  plugins: [],
};
export default config;
