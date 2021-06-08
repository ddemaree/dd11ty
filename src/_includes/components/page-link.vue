<template>
  <a :href="href" :class="linkClasses">
    <i :class="iconClasses"></i>
    <span class="flex-1"><slot></slot></span>
  </a> 
</template>

<script>
export default {
  props: ['href', 'previous', 'next'],
  computed: {
    iconClasses() {
      return [
        'fas',
        (this.previous && 'fa-arrow-left'),
        (this.next && 'fa-arrow-right'),
        'fa-fw'
      ]
    },
    linkClasses() {
      return [
        'flex-1 flex items-center leading-snug gap-2 font-medium text-accent no-underline',
        (this.next && 'sm:flex-row-reverse')
      ]
    }
  }
}
</script>