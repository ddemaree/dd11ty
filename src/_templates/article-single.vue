<template>
  <main>
    <article class="dd-prose">
      <header class="text-center contents">
        <h1 class="dd-title">{{ title }}</h1>
        <p v-if="subtitle">{{ subtitle }}</p>
        <p class="mt-4 text-base text-ink-medium font-medium">{{ this.prettyDate(article.date) }}</p>
      </header>
      <div class="dd-prose" v-html="content"></div>

      <div class="flex flex-col sm:flex-row sm:items-center gap-3">
        <page-link previous="1" :href="previousPageHref" v-if="previousPageHref">
          {{ previousArticle.data.title }}
        </page-link>
        <page-link next="1" :href="nextPageHref" v-if="nextPageHref">
          {{ nextArticle.data.title }}
        </page-link>
      </div>
    </article>
  </main>
</template>

<script>
import _ from 'lodash'
import pageLink from '../_includes/components/page-link.vue'

export default {
  components: { pageLink },
  data() {
    return {
      components: { pageLink },
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
    },
    nextPageHref() {
      return this.pagination.nextPageHref
    },
    nextArticle() {
      const nextHref = this.pagination.nextPageHref
      if(!nextHref) return null

      const nextSlug = nextHref.replace(/^\/p\//, '').replace(/\/$/, '')
      return _.first(_.filter(this.collections.articles, article => article.fileSlug === nextSlug))
    },
    previousPageHref() {
      return this.pagination.previousPageHref
    },
    previousArticle() {
      const previousHref = this.pagination.previousPageHref
      if(!previousHref) return null

      const previousSlug = previousHref.replace(/^\/p\//, '').replace(/\/$/, '')
      return _.first(_.filter(this.collections.articles, article => article.fileSlug === previousSlug))
    }
  },
  created() {
  }
}
</script>