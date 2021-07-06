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

    // data.wpNotes.forEach(note => {
    //   rows.push(`/${note.slug} /notes/${note.slug} 301`)
    // })
    // data.collections.articles.forEach(article => {
    //   const articleUrl = `/p/${article.fileSlug}`
    //   rows.push(`/${article.fileSlug} ${articleUrl} 301`)

    //   if(article.data.slug && article.data.slug !== article.fileSlug) {
    //     rows.push(`/${article.data.slug} ${articleUrl} 301`)
    //   }

    //   if(article.data.aliases) {
    //     article.data.aliases.forEach(alias => {
    //       rows.push(`${alias} ${articleUrl} 301`)
    //     })
    //   }
    // })
    // console.log( data.collections.all.map(p => p.url) )

    return _.uniq(rows).join("\n")
  }
}

module.exports = Redirects