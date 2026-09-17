import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#15161c",
        surface: "#1d1e26",
        stroke: "#30303d",
        brand: { DEFAULT: "#8854c0", hover: "#9b68d1" },
      },
      fontFamily: {
        sans: ['"Source Sans 3"', '"Source Sans Pro"', "Arial", "sans-serif"],
      },
      boxShadow: { overlay: "0 -140px 250px 0 #000 inset" },
    },
  },
  plugins: [],
};
export default config;
