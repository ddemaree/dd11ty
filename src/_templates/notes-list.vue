<template>
  <div class="dd-prose">
    <header class="py-8 text-center">
      <h1 class="font-sans-display uppercase text-lg tracking-widest">Briefly noted</h1>
      <p class="text-base text-ink-medium">Short posts and links</p>
      <p class="text-base text-ink-medium">Page {{ currentPage }} of {{ totalPages }}</p>
    </header>
    <div v-for="note in notes" :key="note.id" class="dd-prose">
      <p class="mb-4 text-ink-medium uppercase tracking-wider">{{ formatDate(note.date_gmt) }}</p>
      <h2 class="dd-heading-2 mt-0" v-html="note.title.rendered"></h2>
      <div class="dd-prose" v-html="note.content.rendered"></div>
      <hr />
    </div>
    <div class="pagination flex flex-col sm:flex-row pb-12 gap-3">
      <a :href="pagination.href.previous" v-if="pagination.href.previous" class="no-underline font-medium text-accent">
        <i class="fas fa-arrow-left fa-fw"></i>
        Newer posts
      </a>
      <span class="flex-1 hidden sm:block"></span> 
      <a :href="pagination.href.next" v-if="pagination.href.next" class="no-underline font-medium text-accent">
        <i class="fas fa-arrow-right fa-fw"></i>
        Older posts
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      layout: 'layouts/base.njk',
      active_nav: 'notes',
      pagination: {
        data: 'wpNotes',
        size: 10,
        alias: 'notes'
      },
      permalink: data => {
        if(data.pagination.pageNumber > 0)
          return `/notes/${data.pagination.pageNumber + 1}/index.html`;
        else
          return `/notes/index.html`;
      },
    }
  },
  methods: {
    formatDate(date) {
      return this.prettyDate(date)
    }
  },
  computed: {
    _notes() {
      console.log(this.note)
      return []
    },
    currentPage() {
      return this.pagination.pageNumber + 1
    },
    totalPages() {
      return this.pagination.pages.length
    }
  }
}
</script>