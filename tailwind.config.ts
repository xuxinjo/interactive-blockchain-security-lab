import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./content/**/*.{ts,tsx,mdx}",
    "./lib/**/*.{ts,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        slateNight: "#0f172a",
        slateSurface: "#111827",
        labBlue: "#1d4ed8",
        labCyan: "#0891b2",
        labWarning: "#b45309"
      }
    }
  },
  plugins: []
};

export default config;
