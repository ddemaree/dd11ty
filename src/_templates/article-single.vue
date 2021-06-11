<template>
  <main>
    <article class="dd-prose pt-8">
      <header class="text-center contents">
        <h1 class="dd-title">{{ title }}</h1>
        <p v-if="subtitle">{{ subtitle }}</p>
        <p class="mt-4 text-base text-ink-medium font-medium">{{ this.prettyDate(article.date) }}</p>
      </header>

      <div class="dd-prose mb-8" v-html="content"></div>

      <tags-list :tags="tags" v-if="hasTags" class="mb-8" />

    </article>

    <div class="w-full-inset mx-auto flex flex-col sm:flex-row sm:items-center gap-3 pt-12">
      <page-link previous="1" :href="previousPageHref" v-if="previousPageHref">
        <span class="sm:block text-sm uppercase tracking-wider text-ink-light">Previous:</span>
        {{ previousArticle.data.title }}
      </page-link>
      <span class="flex-1"></span>
      <page-link next="1" :href="nextPageHref" v-if="nextPageHref">
        <span class="sm:block text-sm uppercase tracking-wider text-ink-light">Next:</span>
        {{ nextArticle.data.title }}
      </page-link>
    </div>
  </main>
</template>

<script>
import _ from 'lodash'
import pageLink from '../_includes/components/page-link.vue'
import tagsList from '../_includes/components/tags-list.vue'

export default {
  components: { pageLink, tagsList },
  data() {
    return {
      active_nav: "articles",
      layout: "layouts/base.njk",
      pagination: {
        data: 'collections.articles',
        size: 1,
        alias: 'article'
      },
      permalink({ article }) {
        return `/p/${article.fileSlug}/index.html`
      },
      eleventyComputed: {
        metadata({ article }) {
          return article.data.metadata
        },
        title({ article }) {
          return article.data.title
        },
        excerpt({ article }) {
          return article.data.excerpt
        }
      }
    }
  },
  computed: {
    content() {
      return this.article.templateContent
    },
    subtitle() {
      const { data } = this.article
      return (data.subtitle || data.excerpt)
    },
    tags() {
      return this.processPostTags(this.article.data.tags || [])
    },
    hasTags() {
      return !_.isEmpty(this.tags);
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
  }
}
</script>