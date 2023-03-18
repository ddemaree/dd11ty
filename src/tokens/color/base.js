const chroma = require("chroma-js");

// const gray = chroma([38, 38, 38]);
// console.log(gray.luminance());

const mainRed = chroma([220, 38, 38]);
const mainGray = chroma([214, 211, 209]);
const mainBlue = chroma([2, 132, 199]);
const mainGreen = mainBlue.set("lch.h", 150).set("lch.c", 110);

const out = {
  color: {
    base: {
      neutral: {
        90: { value: chroma([38, 38, 38]).luminance(0.02).hex() },
        70: { value: chroma([38, 38, 38]).luminance(0.1).hex() },
        50: { value: chroma([38, 38, 38]).luminance(0.232).hex() },
        30: { value: chroma([38, 38, 38]).luminance(0.38).hex() },
        10: { value: chroma([38, 38, 38]).luminance(0.68).hex() },
      },
      red: {
        10: {
          value: chroma("#d44").saturate(0.8).luminance(0.7, "oklch").hex(),
        },
        30: {
          value: chroma("#d44").saturate(0.9).luminance(0.38, "oklch").hex(),
        },
        50: {
          value: chroma("#d44").saturate(0.5).luminance(0.226, "oklch").hex(),
        },
        70: {
          value: chroma("#d44").saturate(0.5).luminance(0.1, "oklch").hex(),
        },
        90: {
          value: chroma("#d44").saturate(0.5).luminance(0.03, "oklch").hex(),
        },
      },
      blue: {
        10: { value: mainBlue.luminance(0.7, "oklch").hex() },
        30: { value: mainBlue.luminance(0.38, "oklch").hex() },
        50: { value: mainBlue.luminance(0.23, "oklch").hex() },
        70: { value: mainBlue.luminance(0.12, "oklch").hex() },
        90: { value: mainBlue.luminance(0.03, "oklch").hex() },
      },
      green: {
        10: { value: mainGreen.luminance(0.7, "oklch").hex() },
        30: { value: mainGreen.luminance(0.38, "oklch").hex() },
        50: { value: mainGreen.luminance(0.23, "oklch").hex() },
        70: { value: mainGreen.luminance(0.12, "oklch").hex() },
        90: { value: mainGreen.luminance(0.03, "oklch").hex() },
      },
    },
  },
};

module.exports = out;
