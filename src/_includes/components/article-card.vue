<template>
  <article class="flex flex-col-reverse sm:flex-row gap-6">
    <a :href="link" class="space-y-1 flex-1">
      <h2 class="dd-heading-2">{{ title }}</h2>
      <p v-if="excerpt" class="max-w-[40ch]">{{ excerpt }}</p>
      <p class="font-medium text-sm">{{ date }}</p>
    </a>
    <a :href="link" v-if="thumbnail">
      <article-thumbnail :src="thumbnail" class="sm:w-40 sm:h-30" />
    </a>
  </article>
</template>

<script>
import articleThumbnail from './article-thumbnail.vue'

export default {
  components: { articleThumbnail },
  props: ['link', 'title', 'excerpt', 'date', 'thumbnail', 'fileSlug']
}
</script>