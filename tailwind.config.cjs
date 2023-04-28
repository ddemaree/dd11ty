const { reduce, isArray } = require("lodash");
const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

const {
  typographyPlugin,
  colorsPlugin,
} = require("./src/lib/tailwind/index.cjs");

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

const ddThemeColors = {
  dd: {
    background: `rgb(var(--dd-col-background) / <alpha-value>)`,
    text: {
      DEFAULT: `rgb(var(--dd-col-text) / <alpha-value>)`,
      bold: `rgb(var(--dd-col-bold-text) / <alpha-value>)`,
      light: `rgb(var(--dd-col-light-text) / <alpha-value>)`,
    },
    link: {
      DEFAULT: `rgb(var(--dd-col-link) / <alpha-value>)`,
    },
    code: {
      DEFAULT: `rgb(var(--dd-col-code) / <alpha-value>)`,
      background: `rgb(var(--dd-col-code-background) / <alpha-value>)`,
    },
    dividers: `rgb(var(--dd-col-dividers) / <alpha-value>)`,
    blockquote: {
      DEFAULT: `rgb(var(--dd-col-blockquote) / <alpha-value>)`,
      border: `rgb(var(--dd-col-blockquote-border) / <alpha-value>)`,
    },
  },
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[data-theme="dark"]'],
  important: true,
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    supports: {
      cq: "container-type: inline-size",
      "no-cq": "not (container-type: inline-size)",
    },
    fontFamily: ({ theme }) => ({
      sans: ["soehne-web", ...defaultTheme.fontFamily.sans],
      serif: ["tiempos-text", ...defaultTheme.fontFamily.serif],
      mono: ["soehne-mono-web", ...defaultTheme.fontFamily.mono],
      "serif-headline": ["tiempos-headline", ...defaultTheme.fontFamily.serif],
    }),
    extend: {
      // colors: {
      //   ...ddThemeColors,
      // },
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
      lineHeight: {
        smart: "calc(1em + 1ex)",
      },
    },
  },
  plugins: [
    colorsPlugin,
    typographyPlugin,
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

    plugin(
      function ({ addBase, theme }) {
        const fontFamilies = mapToCSSVars("font", theme("fontFamily"));
        const spacings = mapToCSSVars("spacing", theme("spacing"));
        const widths = mapToCSSVars("w", theme("width"));
        const maxWidths = mapToCSSVars("maxw", theme("maxWidth"));

        addBase([
          {
            ":root": {
              colorScheme: "light",
              "--inset-x": "max(1.5rem, 5vw)",
              // TODO: Deprecate these in favor of w-content and w-wide
              "--width-content": theme("width.content"),
              "--width-wide": theme("width.wide"),
              ...fontFamilies,
              ...spacings,
              ...widths,
              ...maxWidths,
            },
          },
        ]);
      },
      {
        extend: {
          width: {
            content: "45rem",
            wide: "59rem",
          },
        },
      }
    ),
    plugin(function ({ addVariant, matchVariant }) {
      // addVariant("desc", ":where(& *)");

      matchVariant(
        "desc",
        (value) => {
          return `& ${value}`;
        },
        {
          values: {
            any: "*", // any descendant
            p: "p",
            direct: "& > *", // direct descendant
            links: "a",
            headings: ":is(h1, h2, h3, h4, h5, h6)",
            h1: "h1",
            h2: "h2",
            h3: "h3",
            lists: ":is(ul, ol)",
            listitems: ":is(ul, ol) > li",
            ul: "ul",
            ol: "ol",
            li: "li",
          },
        }
      );
    }),
  ],
};
