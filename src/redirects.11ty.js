const _ = require('lodash')

class Redirects {
  data() {
    return {
      permalink: '/_redirects'
    }
  }
  render(data) {
    let rows = [
      "/articles https://demaree.blog/ 301",
      "/:slug https://demaree.blog/p/:slug 301",
      "/p/:slug https://demaree.blog/p/:slug 301",
      "/notes/:slug https://demaree.blog/p/:slug 301"
    ]

    return _.uniq(rows).join("\n")
  }
}

module.exports = Redirects