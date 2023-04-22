/** @typedef { import('./types').ColorSchemeMap } ColorSchemeMap */

const plugin = require('tailwindcss/plugin');
const chroma = require('chroma-js');
const _ = require('lodash');

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
  }
};


/** @type {ColorSchemeMap} */
const lightTheme = {
  background: [250, 250, 249],
  text: [41, 37, 36],
  boldText: [12, 10, 9],
  lightText: [87, 83, 78],
  link: [216, 44, 52],
  code: [37, 99, 235],
  codeBackground: [241, 245, 249],
  dividers: [231, 229, 228],
  blockquote: [87, 83, 78],
  blockquoteBorder: [226, 232, 240],
  menuBackground: chroma(250, 250, 249).darken(0.6).rgb(),
  menuText: [41, 37, 36],
  menuHoverBackground: [250, 250, 249],
  menuActiveBackground: [250, 250, 249],
};

/** @type {ColorSchemeMap} */
const darkTheme = {
  background: [12, 10, 9],
  text: [204, 201, 199],
  boldText: [245, 245, 244],
  lightText: [155, 152, 150],
  link: [255, 84, 81],
  code: [96, 165, 250],
  codeBackground: [15, 23, 42],
  dividers: [41, 37, 36],
  blockquote: [148, 163, 184],
  blockquoteBorder: [30, 41, 59],
  menuBackground: chroma(12, 10, 9).brighten(1).rgb(),
  menuText: [204, 201, 199],
  menuHoverBackground: chroma(12, 10, 9).brighten(0.5).rgb(),
  menuActiveBackground: [15, 23, 42],
};

function colorSchemeToCSS(colorScheme) {
  const css = {};
  for (const [key, value] of Object.entries(colorScheme)) {
    const cssVarKey = _.kebabCase(key);
    css[`--dd-col-${cssVarKey}`] = value.join(' ');
  }
  return css;
}

const ddColorsPlugin = plugin(({ addBase, addComponents, theme }) => {
  const componentsMap = {
    '.theme-light': {...colorSchemeToCSS(lightTheme)},
    '.theme-dark': {...colorSchemeToCSS(darkTheme)},
  };
  
  addComponents(componentsMap);

  const baseMap = {
    body: {
      color: `rgb(var(--dd-col-text) / 1)`,
      backgroundColor: `rgb(var(--dd-col-background) / 1)`,
    },
    ':where(a, a:link)': {
      color: `rgb(var(--dd-col-link) / 1)`,
    },
    ':where(b, strong)': {
      color: `rgb(var(--dd-col-bold-text) / 1)`,
    },
    ':where(blockquote)': {
      color: `rgb(var(--dd-col-blockquote) / 1)`,
      borderLeftColor: `rgb(var(--dd-col-blockquote-border) / 1)`,
    },
    ':where(code, kbd, samp, pre)': {
      color: `rgb(var(--dd-col-code) / 1)`,
      backgroundColor: `rgb(var(--dd-col-code-background) / 1)`,
    },
    ':where(hr)': {
      borderColor: `currentColor`,
      color: `rgb(var(--dd-col-dividers) / 1)`,
    },
  }

  addBase(baseMap);
}, {
  theme: {
    extend: {
      colors: ddThemeColors,
    }
  }
});

module.exports = ddColorsPlugin;