<template>
  <div class="post-tags my-8 text-base flex flex-wrap gap-4">
    <span class="block w-full mb-6">
      <hr class="h-0 border-t-2 border-ink-light" />
    </span>
    <a v-for="tag in _tags" :key="tag.name" :href="tag.url" class="t-tag tag leading-none font-medium flex gap-2 items-baseline no-underline">
      <i class="fal fa-tag fa-xs"></i>
      <span>{{ tag.name }}</span>
    </a>
  </div>  
</template>

<script>
import _ from 'lodash'

const FILTERED_TAGS = ['featured', 'selected', 'posts', 'event', 'articles', 'notes']

export default {
  props: ['tags'],
  computed: {
    _tags() {
      const slug = this.slug

      return _.filter(Array.from(this.tags), t => (!_.includes(FILTERED_TAGS, t)))
        .map(_tag => ({
          name: _tag,
          url: `/tags/${slug(_tag)}`
        }))
    }
  }
}
</script>