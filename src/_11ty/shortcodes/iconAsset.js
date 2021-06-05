const path = require('path')
const _ = require('lodash')
const Image = require("@11ty/eleventy-img");
const { INPUT_DIR, OUTPUT_DIR } = require('../constants');

async function iconShortcode(src, size='png-192') {
  src = path.join(INPUT_DIR, src)

  let metadata = await Image(src, {
    widths: [180, 192, 512],
    formats: ["png", "svg"],
    outputDir: path.join(OUTPUT_DIR, "static", "img"),
    urlPath: "/static/img"
  });

  const { svg, png } = metadata
  const sizes = {
    svg: svg[0],
    ...(_.keyBy(png, s => `png-${s.width}`))
  }

  return sizes[size].url
}

module.exports = iconShortcode