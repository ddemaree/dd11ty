<template>
  <div id="mything" class="flex flex-col items-center gap-12 pb-16">
    <header class="max-w-2xl pt-12">
      <h1 class="dd-title text-center">{{ title }}</h1>
    </header>
    <article-card 
      class="mx-auto max-w-2xl w-full-inset"
      v-for="article in articles"
      v-bind:key="article.fileSlug"
      v-bind="article" />
  </div>
</template>

<script>
import _ from 'lodash'
import articleCard from './_includes/components/article-card.vue'

export default {
  components: {
    articleCard
  },
  data: {
    layout: "layouts/base.njk",
    title: "Blog Archives",
    active_nav: "articles"
  },
  computed: {
    articles: function() {
      const articles = _.reverse([...this.collections.articles])
      
      return articles.map(function({ data, url, ...article}){
        return {
          link: url,
          title: data.title,
          excerpt: ((data.metadata && data.metadata.description) || data.excerpt),
          date: article.date,
          fileSlug: article.fileSlug,
          thumbnail: (data.thumbnail || data.featured_image)
        }
      })
    }
  }
}
</script>
