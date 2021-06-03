const fs = require("fs/promises");
const path = require("path");
const markdownIt = require("markdown-it");
const Imgix = require("@imgix/js-core");
const _ = require('lodash');
const { DateTime } = require('luxon')

const imgixClient = new Imgix({
  domain: 'ddimg.imgix.net',
  useHTTPS: true
});

const Image = require("@11ty/eleventy-img");

async function iconShortcode(src, size='png-192') {
  src = path.join(__dirname, 'src', src)

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

const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");

const INPUT_DIR = "src";
const OUTPUT_DIR = "_site";

// This will change both Eleventy's pathPrefix, and the one output by the
// vite-related shortcodes below. Double-check if you change this, as this is only a demo :)
const PATH_PREFIX = "/";

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/**/*.{jpg,jpeg,png,gif}");
  eleventyConfig.addPassthroughCopy("./src/static")

  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRss);

  // Disable whitespace-as-code-indicator, which breaks a lot of markup
  const configuredMdLibrary = markdownIt({ html: true })
    .disable("code")
    .use(require('markdown-it-attrs'))
    .use(require('markdown-it-footnote'));
  eleventyConfig.setLibrary("md", configuredMdLibrary);

  eleventyConfig.addFilter("prettyDate", date => {
    const dateObj = DateTime.fromISO(date) 
    return dateObj.toLocaleString(DateTime.DATE_FULL).replace(',', '')
  })

  eleventyConfig.addNunjucksAsyncShortcode("iconAsset", iconShortcode)

  eleventyConfig.addShortcode("imgix", (path, width=null, height=null, alt="Image for post") => {
    let attrs = {}

    const src = imgixClient.buildURL(path, {
      w: width,
      h: height
    })

    const srcset = imgixClient.buildSrcSet(
      path, 
      {}, 
      {
        minWidth: 300,
        maxWidth: 2400,
        widthTolerance: 0.1
      }
    )

    attrs = _.pickBy({
      src,
      srcset,
      height,
      width,
      alt,
      class: "lazyload",
      sizes: "(max-width: 675px) 100vw, 1200px"
    })

    const attrsString = _.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(' ')

    return `<img ${attrsString}>`;
  })

  // Read Vite's manifest.json, and add script tags for the entry files
  // You could decide to do more things here, such as adding preload/prefetch tags
  // for dynamic segments
  // NOTE: There is some hard-coding going on here, with regard to the assetDir
  // and location of manifest.json
  // you could probably read vite.config.js and get that information directly
  // @see https://vitejs.dev/guide/backend-integration.html
  eleventyConfig.addNunjucksAsyncShortcode("viteScriptTag", viteScriptTag);
  eleventyConfig.addNunjucksAsyncShortcode(
    "viteLegacyScriptTag",
    viteLegacyScriptTag
  );
  eleventyConfig.addNunjucksAsyncShortcode(
    "viteLinkStylesheetTags",
    viteLinkStylesheetTags
  );
  eleventyConfig.addNunjucksAsyncShortcode(
    "viteLinkModulePreloadTags",
    viteLinkModulePreloadTags
  );

  async function viteScriptTag(entryFilename) {
    const entryChunk = await getChunkInformationFor(entryFilename);
    return `<script type="module" src="${PATH_PREFIX}${entryChunk.file}"></script>`;
  }

  /* Generate link[rel=modulepreload] tags for a script's imports */
  /* TODO(fpapado): Consider link[rel=prefetch] for dynamic imports, or some other signifier */
  async function viteLinkModulePreloadTags(entryFilename) {
    const entryChunk = await getChunkInformationFor(entryFilename);
    if (!entryChunk.imports || entryChunk.imports.length === 0) {
      console.log(
        `The script for ${entryFilename} has no imports. Nothing to preload.`
      );
      return "";
    }
    /* There can be multiple import files per entry, so assume many by default */
    /* Each entry in .imports is a filename referring to a chunk in the manifest; we must resolve it to get the output path on disk.
     */
    const allPreloadTags = await Promise.all(
      entryChunk.imports.map(async (importEntryFilename) => {
        const chunk = await getChunkInformationFor(importEntryFilename);
        return `<link rel="modulepreload" href="${PATH_PREFIX}${chunk.file}"></link>`;
      })
    );

    return allPreloadTags.join("\n");
  }

  async function viteLinkStylesheetTags(entryFilename) {
    const entryChunk = await getChunkInformationFor(entryFilename);
    if (!entryChunk.css || entryChunk.css.length === 0) {
      console.warn(`No css found for ${entryFilename} entry. Is that correct?`);
      return "";
    }
    /* There can be multiple CSS files per entry, so assume many by default */
    return entryChunk.css
      .map(
        (cssFile) =>
          `<link rel="stylesheet" href="${PATH_PREFIX}${cssFile}"></link>`
      )
      .join("\n");
  }

  async function viteLegacyScriptTag(entryFilename) {
    const entryChunk = await getChunkInformationFor(entryFilename);
    return `<script nomodule src="${PATH_PREFIX}${entryChunk.file}"></script>`;
  }

  async function getChunkInformationFor(entryFilename) {
    // We want an entryFilename, because in practice you might have multiple entrypoints
    // This is similar to how you specify an entry in development more
    if (!entryFilename) {
      throw new Error(
        "You must specify an entryFilename, so that vite-script can find the correct file."
      );
    }

    // TODO: Consider caching this call, to avoid going to the filesystem every time
    const manifest = await fs.readFile(
      path.resolve(process.cwd(), "_site", "manifest.json")
    );
    const parsed = JSON.parse(manifest);

    let entryChunk = parsed[entryFilename];

    if (!entryChunk) {
      const possibleEntries = Object.values(parsed)
        .filter((chunk) => chunk.isEntry === true)
        .map((chunk) => `"${chunk.src}"`)
        .join(`, `);
      throw new Error(
        `No entry for ${entryFilename} found in _site/manifest.json. Valid entries in manifest: ${possibleEntries}`
      );
    }

    return entryChunk;
  }

  return {
    templateFormats: ["md", "njk", "html"],
    pathPrefix: PATH_PREFIX,
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: INPUT_DIR,
      output: OUTPUT_DIR,
      // NOTE: These two paths are relative to dir.input
      // @see https://github.com/11ty/eleventy/issues/232
      includes: "_includes",
      data: "_data",
    },
  };
};
