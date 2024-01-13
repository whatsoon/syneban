import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        spin: "spin 2s linear infinite",
        spinner: "spinner 1.5s ease-in-out infinite",
      },
      keyframes: {
        spinner: {
          "0%": { strokeDasharray: "0 150", strokeDashoffset: "0" },
          "47.5%": { strokeDasharray: "42 150", strokeDashoffset: "-16" },
          "95%, to": { strokeDasharray: "42 150", strokeDashoffset: "-59" },
        },
      },
      fontFamily: {
        sans: ["var(--font-roboto)", "sans-serif"],
      },
      zIndex: {
        '100': '100',
      }
    },
  },
  plugins: [],
};
export default config;
