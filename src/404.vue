<template>
  <main class="flex flex-col items-center justify-center gap-4">
    <p class="text-5xl font-light">404</p>
    <p>Sorry, page not found</p>
  </main>
</template>

<script>
export default {
  data() {
    return {
      gridwrap: false,
      layout: 'layouts/base.njk',
      permalink: '/404.html'
    }
  }
}
</script>