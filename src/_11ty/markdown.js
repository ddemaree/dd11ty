const markdownIt = require("markdown-it");

const configuredMdLibrary = markdownIt({ html: true })
  .disable("code")
  .use(require('markdown-it-attrs'))
  .use(require('markdown-it-footnote'));

module.exports = configuredMdLibrary