<template>
  <main>
    <article class="dd-prose">
      <header class="text-center contents">
        <h1 class="dd-title">{{ title }}</h1>
        <p v-if="subtitle">{{ subtitle }}</p>
        <p class="mt-4 text-base text-ink-medium font-medium">{{ this.prettyDate(article.date) }}</p>
      </header>
      <div class="dd-prose" v-html="content"></div>
    </article>
  </main>
</template>

<script>
import _ from 'lodash'

export default {
  data() {
    return {
      layout: "layouts/base.njk",
      pagination: {
        data: 'collections.articles',
        size: 1,
        alias: 'article'
      },
      permalink(data) {
        return `/p/${data.article.fileSlug}/index.html`
      }
    }
  },
  computed: {
    content() {
      return this.article.templateContent
    },
    title() {
      return this.article.data.title
    },
    subtitle() {
      const { data } = this.article
      return (data.subtitle || data.excerpt)
    }
  }
}
</script>