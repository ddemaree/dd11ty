const plugin = require("tailwindcss/plugin");
const styles = require("./styles.cjs");
const merge = require("lodash.merge");
const castArray = require("lodash.castarray");
const { commonTrailingPseudos } = require("./utils.cjs");

const computed = {
  // Reserved for future "magic properties", for example:
  // bulletColor: (color) => ({ 'ul > li::before': { backgroundColor: color } }),
};

function inWhere(selector, { className, modifier, prefix }) {
  let selectorPrefix = selector.startsWith(">")
    ? `${
        modifier === "DEFAULT" ? `.${className}` : `.${className}-${modifier}`
      } `
    : "";
  // selectorPrefix = "";
  selectorPrefix = selector.startsWith(">") ? `& ` : "";

  // Parse the selector, if every component ends in the same pseudo element(s) then move it to the end
  let [trailingPseudo, rebuiltSelector] = commonTrailingPseudos(selector);

  if (trailingPseudo) {
    // return `:where(${selectorPrefix}${rebuiltSelector})${trailingPseudo}`;
    return `${selectorPrefix}${rebuiltSelector}${trailingPseudo}`;
  }

  // TODO: Bring back :where wrapping somehow
  // const fixedSelector = `:where(${selectorPrefix}${selector})`;
  const fixedSelector = `${selectorPrefix}${selector}`;

  return fixedSelector;
}

module.exports = plugin.withOptions(
  ({ className = "prose" } = {}) => {
    return function ({ addBase, addVariant, addComponents, theme, prefix }) {
      let modifiers = theme("typography");
      let options = { className, prefix };

      // Adds support for modifying children using eg prose-headings:...
      for (let [name, ...selectors] of [
        ["headings", "h1", "h2", "h3", "h4", "h5", "h6", "th"],
        ["h1"],
        ["h2"],
        ["h3"],
        ["h4"],
        ["h5"],
        ["h6"],
        ["p"],
        ["a"],
        ["blockquote"],
        ["figure"],
        ["figcaption"],
        ["strong"],
        ["em"],
        ["code"],
        ["pre"],
        ["ol"],
        ["ul"],
        ["li"],
        ["table"],
        ["thead"],
        ["tr"],
        ["th"],
        ["td"],
        ["img"],
        ["video"],
        ["hr"],
        ["lead", '[class~="lead"]'],
      ]) {
        selectors = selectors.length === 0 ? [name] : selectors;

        let selector = selectors.join(", ");

        addVariant(
          `${className}-${name}`,
          `& :is(${inWhere(selector, options)})`
        );
      }

      // Default tokens for prose styles

      /* 
      prose-figcaption:font-sans prose-figcaption:text-stone-500 dark:prose-figcaption:text-stone-400 prose-a:text-red-500 dark:prose-a:text-red-500 prose-strong:text-black dark:prose-strong:text-white prose-headings:text-black dark:prose-headings:text-white tweets-handle:text-slate-400 dark:tweets-handle:text-slate-400 tweets-name:text-slate-900 dark:tweets-name:text-slate-100 tweets-name:m-0 tweets:bg-slate-200 dark:tweets:bg-slate-800  tweets-footer:mt-4 tweets-footer:text-sm tweets-date:text-slate-400 tweets-date:no-underline dark:tweets-content:text-slate-200 tweets-content:text-slate-700 */
      addBase({
        ":root": {
          "--prose-base-font-size": "clamp(17px, 2.5vw, 20px)",

          "--prose-base-font-family": theme("fontFamily.serif"),
          "--prose-headings-font-family": theme("fontFamily.sans"),
          "--prose-quotes-font-family": theme("fontFamily.sans"),
          "--prose-captions-font-family": theme("fontFamily.sans"),
          "--prose-code-font-family": theme("fontFamily.mono"),

          // TODO: Dark mode?
          "--prose-base-color": theme("colors.neutral.800"),
          "--prose-links-color": theme("colors.red.500"),
          "--prose-strong-color": theme("colors.black"),
          "--prose-headings-color": "var(--prose-strong-color)",
          "--prose-dividers-color": theme("colors.neutral.300"),
          "--prose-quotes-color": theme("colors.neutral.600"),
          "--prose-quotes-border-color": theme("colors.neutral.200"),
          "--prose-captions-color": theme("colors.neutral.500"),
          "--prose-code-color": theme("colors.blue.500"),

          "--prose-quotes-border-width": "0.20rem",
          "--prose-lists-marker-font-family": theme("fontFamily.sans"),

          "--prose-flow-spacing-xs":
            "calc(var(--prose-base-font-size) * 0.375)",
          "--prose-flow-spacing-sm": "calc(var(--prose-base-font-size) * 0.75)",
          "--prose-flow-spacing-normal":
            "calc(var(--prose-base-font-size) * 1.5)",
          "--prose-flow-spacing-big": "calc(var(--prose-base-font-size) * 3)",

          "--prose-indent": "1.5em",
          "--prose-indent-nested": "calc(var(--prose-indent) / 4)",
        },
      });

      const componentDefs = Object.keys(modifiers).map((modifier) => ({
        [modifier === "DEFAULT"
          ? `.${className}`
          : `.${className}-${modifier}`]: configToCss(modifiers[modifier], {
          className,
          modifier,
          prefix,
        }),
      }));

      addComponents(componentDefs);
    };
  },
  () => {
    return {
      theme: { typography: styles },
    };
  }
);

function configToCss(config = {}, { className, modifier, prefix }) {
  function updateSelector(k, v) {
    if (Array.isArray(v)) {
      return [k, v];
    }

    if (isObject(v)) {
      let nested = Object.values(v).some(isObject);
      if (nested) {
        return [
          inWhere(k, { className, modifier, prefix }),
          v,
          Object.fromEntries(
            Object.entries(v).map(([k, v]) => updateSelector(k, v))
          ),
        ];
      }

      return [inWhere(k, { className, modifier, prefix }), v];
    }

    return [k, v];
  }

  return Object.fromEntries(
    Object.entries(
      merge(
        {},
        ...Object.keys(config)
          .filter((key) => computed[key])
          .map((key) => computed[key](config[key])),
        ...castArray(config.css || {})
      )
    ).map(([k, v]) => updateSelector(k, v))
  );
}

function isObject(value) {
  return typeof value === "object" && value !== null;
}
