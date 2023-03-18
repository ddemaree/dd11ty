/** @type {import('tailwindcss').Config} */
const { reduce, isArray } = require("lodash");
const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

const ddTypographyPlugin = require("./src/lib/tailwind/typography/index.cjs");
const ddColorTokens = require("./src/styles/tokens/tailwindColors.cjs");

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
  darkMode: ["class", '[data-theme="dark"]'],
  important: true,
  content: ["./src/**/*.{html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    supports: {
      cq: "container-type: inline-size",
      "no-cq": "not (container-type: inline-size)",
    },
    fontFamily: ({ theme }) => ({
      sans: ["soehne-web", ...defaultTheme.fontFamily.sans],
      // sans: "var(--font--mona-sans)",
      serif: ["tiempos-text", ...defaultTheme.fontFamily.serif],
      mono: ["soehne-mono-web", ...defaultTheme.fontFamily.mono],
      "serif-headline": ["tiempos-headline", ...defaultTheme.fontFamily.serif],
    }),
    extend: {
      colors: {
        ...ddColorTokens,
      },
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
    ddTypographyPlugin,

    require("@tailwindcss/container-queries"),

    plugin(function ({ addVariant, theme }) {
      addVariant("tweets", ":is(& .dd-embed-tweet)");
      addVariant("tweets-name", ":is(& .dd-embed-tweet .tweet-author-name)");
      addVariant(
        "tweets-handle",
        ":is(& .dd-embed-tweet .tweet-author-handle)"
      );
      addVariant("tweets-footer", ":is(& .dd-embed-tweet .tweet-footer)");
      addVariant("tweets-date", ":is(& .dd-embed-tweet .tweet-date)");
      addVariant("tweets-content", ":is(& .dd-embed-tweet .tweet-content)");
    }),

    plugin(function ({ addBase, theme }) {
      const fontFamilies = mapToCSSVars("font", theme("fontFamily"));
      const spacings = mapToCSSVars("spacing", theme("spacing"));
      const widths = mapToCSSVars("w", theme("width"));
      const maxWidths = mapToCSSVars("maxw", theme("maxWidth"));

      addBase([
        {
          ":root": {
            colorScheme: "light",
            "--inset-x": "clamp(1.25rem, 6.25vw, 2rem)",
            "--width-content": "45rem",
            "--width-wide": "59rem",
            ...fontFamilies,
            ...spacings,
            ...widths,
            ...maxWidths,
          },
        },
      ]);
    }),
    plugin(function ({ addVariant }) {
      addVariant("desc", ":where(& *)");
      addVariant("desc-links", ":where(& a)");
    }),
  ],
};
