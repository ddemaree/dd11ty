<template>
  <div class="post-tags text-base flex flex-wrap gap-4">
    <span class="block w-full mb-4">
      <hr class="h-0 border-t-2 border-ink-light" />
    </span>
    <a v-for="tag in _tags" :key="tag.name" :href="tag.url" class="t-tag tag leading-none font-medium flex gap-2 items-baseline no-underline">
      <i class="fal fa-tag fa-xs"></i>
      <span>{{ tag.name }}</span>
    </a>
  </div>  
</template>

<script>
export default {
  props: ['tags'],
  computed: {
    _tags() {
      return this.processPostTags(this.tags)
    }
  }
}
</script>