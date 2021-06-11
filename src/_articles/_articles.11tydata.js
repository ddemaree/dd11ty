module.exports = {
  // permalink: '/p/{{ page.fileSlug }}/index.html',
  permalink: false,
  layout: 'layouts/article.njk',
  active_nav: "articles",
  tags: ['articles'],
  eleventyComputed: {
    postUrl({ page }) {
      const urlPath = `/p/${page.fileSlug}/`
      return urlPath
    }
  }
}