import intersect from "tailwindcss-intersect";
import motion from "tailwindcss-motion";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    fontFamily: {
      sans: ["Geist", "system-ui", "sans-serif"],
      mono: ["Geist Mono", "ui-monospace", "monospace"],
      pixel: ["Geist Pixel", "Geist Mono", "monospace"],
      serif: ["Source Serif 4", "Georgia", "serif"],
    },
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        build: "rgb(var(--accent-build) / <alpha-value>)",
        defend: "rgb(var(--accent-defend) / <alpha-value>)",
        support: "rgb(var(--accent-support) / <alpha-value>)",
        gray: {
          50: "rgb(var(--g50) / <alpha-value>)",
          100: "rgb(var(--g100) / <alpha-value>)",
          200: "rgb(var(--g200) / <alpha-value>)",
          300: "rgb(var(--g300) / <alpha-value>)",
          400: "rgb(var(--g400) / <alpha-value>)",
          500: "rgb(var(--g500) / <alpha-value>)",
          600: "rgb(var(--g600) / <alpha-value>)",
          700: "rgb(var(--g700) / <alpha-value>)",
          800: "rgb(var(--g800) / <alpha-value>)",
          900: "rgb(var(--g900) / <alpha-value>)",
          950: "rgb(var(--g950) / <alpha-value>)",
        },
      },
      animation: {
        blink: "blink 0.7s infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
      },
    },
  },
  plugins: [
    motion,
    intersect,
  ],
}

