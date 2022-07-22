/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        background: `rgb(var(--color-background), <alpha-value>)`,
      },
      fontFamily: {
        sans: ["soehne-web", ...defaultTheme.fontFamily.sans],
        serif: ["tiempos-text", ...defaultTheme.fontFamily.serif],
        mono: ["soehne-mono", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
};
