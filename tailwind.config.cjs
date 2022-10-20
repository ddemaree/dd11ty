/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        background: `rgb(var(--theme-background) / <alpha-value>)`,
        text: {
          strong: `rgb(var(--theme-text-strong) / <alpha-value>)`,
          DEFAULT: `rgb(var(--theme-text) / <alpha-value>)`,
          light: `rgb(var(--theme-text-light) / <alpha-value>)`,
          lighter: `rgb(var(--theme-text-lighter) / <alpha-value>)`,
        },
        divider: {
          DEFAULT: `rgb(var(--theme-divider) / <alpha-value>)`,
          light: `rgb(var(--theme-divider-light) / <alpha-value>)`,
        },
        primary: `rgb(var(--theme-primary) / <alpha-value>)`,
        secondary: `rgb(var(--theme-secondary) / <alpha-value>)`,
        accent: `rgb(var(--theme-primary) / <alpha-value>)`,
      },
      fontFamily: {
        sans: ["soehne-web", ...defaultTheme.fontFamily.sans],
        serif: ["tiempos-text", ...defaultTheme.fontFamily.serif],
        mono: ["soehne-mono", ...defaultTheme.fontFamily.mono],
      },
      spacing: {
        inset: `var(--spacing-inset, 1.5rem)`,
      },
      maxWidth: {
        wide: `var(--width-wide)`,
        content: `var(--width-content)`,
      },
      width: {
        "minus-inset": `calc(100% - (var(--spacing-inset) * 2))`,
      },
    },
  },
  plugins: [],
};
