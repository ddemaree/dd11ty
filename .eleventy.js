require('dotenv').config();
const _ = require('lodash')
const CleanCSS = require("clean-css");
const Cache = require("@11ty/eleventy-cache-assets");

process.env.ELEVENTY_EXPERIMENTAL = 1

const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginVue = require("@11ty/eleventy-plugin-vue");
const pluginSyntax = require("@11ty/eleventy-plugin-syntaxhighlight");

const INPUT_DIR = "src";
const OUTPUT_DIR = "_site";
const PATH_PREFIX = "/";

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(require('./src/_11ty/vite'));
  eleventyConfig.addPlugin(pluginSyntax);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginVue)

  eleventyConfig.addTransform('responsify', require('./src/_11ty/transforms/responsify'));
  
  eleventyConfig.setLibrary("md", require('./src/_11ty/markdown'));

  const inlineWebfont = async function(fontName) {
    const styleUrl = `https://cdn.demaree.net/fonts/${fontName}/index.css`
    
    const cssData = await Cache(styleUrl, {
      duration: "7d", type: "text"
    })

    const cleanCss = new CleanCSS({ 
      returnPromise: true,
      format: {
        semicolonAfterLastProperty: true
      }
    })
    const minifiedCss = await cleanCss.minify(cssData)
      .then(cssData => cssData.styles)
      .then(styles => {
        return styles.replace(/url\(/g, `url(https://cdn.demaree.net/fonts/${fontName}/`)
      })
      .catch(err => {
        console.error(err)
        return `/* Error loading font set ${styleUrl} */\n@import url(https://cdn.demaree.net/fonts/${fontName}/index.css)\n;`
      })

    // console.log(minifiedCss)
    // console.log(typeof minifiedCss)
    return minifiedCss + "\n"
  }

  // eleventyConfig.addShortcode("webfontStyle", inlineWebfont)
  eleventyConfig.addNunjucksAsyncShortcode("webfontStyle", inlineWebfont)

  eleventyConfig.addFilter("processPostTags", function(tags) {
    const slug = this.slug
    const _tags = Array.from(tags)
    const FILTERED_TAGS = ['featured', 'selected', 'posts', 'event', 'articles', 'notes'] 
    
    const onlyTopicTags = _.filter(_tags, t => (!_.includes(FILTERED_TAGS, t)))

    const tagObjects = onlyTopicTags.map(_tag => {
      if(_.isObject(_tag)) return _tag
      return {
        name: _tag,
        url: `/tags/${slug(_tag)}`
      }
    })

    return tagObjects
  })

  eleventyConfig.addShortcode("imgix", require('./src/_11ty/shortcodes/imgix'));
  eleventyConfig.addPairedShortcode('gallery', require('./src/_11ty/shortcodes/gallery'));

  eleventyConfig.addNunjucksAsyncShortcode("iconAsset", require('./src/_11ty/shortcodes/iconAsset'));
  eleventyConfig.addNunjucksAsyncShortcode("twitter", require('./src/_11ty/shortcodes/twitter'));
  eleventyConfig.addNunjucksAsyncShortcode("postThumbnail", require('./src/_11ty/shortcodes/postThumbnail'));

  // eleventyConfig.addNunjucksAsyncShortcode("insta", async id => {
  //   // const instaData = await Cache(``)
  // })
  
  eleventyConfig.addFilter("prettyDate", require('./src/_11ty/filters/prettyDate'));

  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.addPassthroughCopy("./src/**/*.{jpg,jpeg,png,gif}");
  eleventyConfig.addPassthroughCopy({ "static": "/" })

  return {
    templateFormats: ["md", "njk", "html", "11ty.js"],
    pathPrefix: PATH_PREFIX,
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    // passthroughFileCopy: true,
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
