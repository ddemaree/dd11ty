const defaultTheme = require("tailwindcss/defaultTheme");
// const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: "class",
  important: true,
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  safelist: [
    "text-lg",
    "text-xl",
    "text-2xl",
    "text-3xl",
    "text-4xl",
    "text-5xl",
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    screens: {
      xs: "374px",
      sm: "601px",
      md: "880px",
    },
    fontFamily: {
      sans: [...defaultTheme.fontFamily.sans],
      serif: ["epicene-text", ...defaultTheme.fontFamily.serif],
      "ivar-text": ["tiempos-text", ...defaultTheme.fontFamily.serif],
      "epicene-text": ["epicene-text", ...defaultTheme.fontFamily.serif],
      "epicene-display": ["epicene-display", ...defaultTheme.fontFamily.serif],
      mono: ["soehne-mono", ...defaultTheme.fontFamily.mono],
    },
    gridTemplateRows: {
      ...defaultTheme.gridTemplateRows,
      base: "auto 1fr auto",
    },
  },
};
