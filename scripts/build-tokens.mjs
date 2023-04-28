#!/usr/bin/env zx

import _ from "lodash";
import StyleDictionary from "style-dictionary";

StyleDictionary.registerFormat({
  name: "tailwindTheme",
  formatter: ({ dictionary }) => {
    const out = { ds: {} };
    const current = out.ds;

    function handleTokenTree(tree, parent) {
      _.each(tree, (value, key) => {
        if (_.isObject(value) && !_.has(value, "value")) {
          parent[key] ??= {};
          handleTokenTree(value, parent[key]);
        } else {
          const referencedToken = dictionary.getReferences(
            value.original.value
          );

          if (value.original?.tailwind === "var") {
            parent[key] = `rgb(var(--${value.name}) / <alpha-value>)`;
          } else {
            parent[key] = value.value;
          }
        }
      });
    }

    handleTokenTree(dictionary.tokens.color, current);

    console.log(out);

    return `module.exports = ${JSON.stringify(out, null, 2)}`;
  },
});

function absPath(inPath) {
  const basePath = new URL("../", import.meta.url);
  return path.join(basePath.pathname, inPath);
}

const sd = StyleDictionary.extend({
  source: [absPath("src/tokens/**/*.{js,json}")],
  platforms: {
    tailwind: {
      transforms: [
        "attribute/cti",
        "attribute/color",
        "name/cti/kebab",
        "color/hex",
        "size/rem",
      ],
      buildPath: "src/styles/tokens/",
      files: [
        {
          destination: "tailwindColors.cjs",
          format: "tailwindTheme",
        },
      ],
    },
    scss: {
      transformGroup: "scss",
      buildPath: "src/styles/tokens/",
      files: [
        {
          destination: "_variables.scss",
          format: "scss/variables",
        },
      ],
    },
    css: {
      transformGroup: "css",
      buildPath: "src/styles/tokens/",
      files: [
        {
          destination: "tokens.css",
          format: "css/variables",
          options: {
            outputReferences: true,
          },
        },
      ],
    },
  },
});

sd.buildAllPlatforms();
