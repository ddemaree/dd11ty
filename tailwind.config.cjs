/** @type {import('tailwindcss').Config} */
const { reduce, isArray } = require("lodash");
const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

const resetSelectors = ["p", "h1", "h2", "h3", "h4", "h5", "h6", "figure"];
const resets = {};

resetSelectors.forEach((selector) => {
  resets[selector] = {
    marginTop: null,
    marginBottom: null,
  };
});

function mapToCSSVars(prefix, tokens) {
  return reduce(
    tokens,
    (vars, value, key) => {
      if (isArray(value)) {
        value = value.join(", ");
      }

      const safeKey = key.replace(/[^0-9A-Za-z\-\_]/g, "_");
      vars[`--${prefix}-${safeKey}`] = value;

      return vars;
    },
    {}
  );
}

module.exports = {
  // darkMode: "media",
  important: true,
  content: ["./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: ({ theme }) => ({
      sans: ["mona-sans", ...defaultTheme.fontFamily.sans],
      serif: ["source-serif-4", ...defaultTheme.fontFamily.serif],
      mono: ["soehne-mono-web", ...defaultTheme.fontFamily.mono],
      "serif-headline": ["tiempos-headline", ...defaultTheme.fontFamily.serif],
      "mona-sans": ["mona-sans", ...defaultTheme.fontFamily.sans],
      "mona-sans": ["source-serif-4", ...defaultTheme.fontFamily.serif],
    }),
    extend: {
      fontSize: {
        title: `clamp(2rem, 10vmin, 3rem)`,
      },
      gridTemplateRows: {
        base: "auto 1fr auto",
      },
      gridTemplateColumns: {
        "post-card": "1fr auto",
      },
      spacing: {
        inset: "var(--inset-x)",
        feed: "var(--spacing--feed)",
        unset: "unset",
      },
      width: {
        inset: "calc(100% - (2 * var(--inset-x)))",
        content: "45rem",
      },
      maxWidth: {
        content: "45rem",
        wide: "59rem",
        prose: "min(65ch, 45rem)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/container-queries"),
    plugin(function ({ addBase, theme }) {
      const fontFamilies = mapToCSSVars("font", theme("fontFamily"));
      const spacings = mapToCSSVars("spacing", theme("spacing"));
      const widths = mapToCSSVars("w", theme("width"));
      const maxWidths = mapToCSSVars("maxw", theme("maxWidth"));

      addBase({
        ":root": {
          "--inset-x": "clamp(1.25rem, 6.25vw, 2rem)",
          ...fontFamilies,
          ...spacings,
          ...widths,
          ...maxWidths,
        },
      });
    }),
    plugin(function ({ addVariant }) {
      addVariant("desc", ":where(& *)");
      addVariant("desc-links", ":where(& a)");

      addVariant("nav-open", ":root:has(.nav-parent .nav-state:checked) &");
      addVariant(
        "nav-closed",
        ":root:not(:has(.nav-parent .nav-state:checked)) &"
      );
    }),
  ],
};
