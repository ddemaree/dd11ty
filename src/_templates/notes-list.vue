<template>
  <div>
    <header class="w-full-inset text-center mx-auto py-12">
      <h1 class="dd-title">Notes</h1>
    </header>
    <div v-for="note in notes" :key="note.id" class="dd-prose">
      <p class="mb-4 text-ink-medium uppercase tracking-wider">{{ formatDate(note.date_gmt) }}</p>
      <h2 class="dd-heading-2 mt-0" v-html="note.title.rendered"></h2>
      <div class="dd-prose" v-html="note.content.rendered"></div>
      <hr />
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
    }
  }
}
</script>