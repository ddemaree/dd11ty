<template>
<div class='text-xl'>
  <label v-for="themeOption in themeOptions" :key="themeOption.key" :class="{'bg-red-30': (themeOption.key === currentTheme)}">
    <fa-icon :icon="themeOption.icon" />
    <input
      type="radio"
      name="theme-toggle"
      class="sr-only"
      :checked="currentTheme === themeOption.key"
      :value="themeOption.key"
      @change="e => setTheme(themeOption.key)" />
  </label>
</div>
</template>

<script>
import { ref, watchEffect, onMounted } from 'vue'

import _ from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
library.add(faSun, faMoon)

export default {
  components: { "fa-icon": FontAwesomeIcon },

  setup() {
    const currentTheme = ref('')

    const getInitialTheme = () => {
      if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
        currentTheme.value = localStorage.getItem('theme');
      }
      else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        currentTheme.value = 'dark';
      }
      else {
        currentTheme.value = 'light';
      }
    }

    if(!import.meta.env.SSR){
      watchEffect(() => {
        const root = document.documentElement;
        if(currentTheme.value === 'dark') {
          root.classList.add('dark');
        }
        else {
          root.classList.remove('dark');
        }
      })
    }

    const setTheme = theme => {
      localStorage.setItem('theme', theme);
      currentTheme.value = theme
    }

    onMounted(getInitialTheme)

    const themeOptions = [
      { key: 'light', icon: 'sun'  },
      { key: 'dark',  icon: 'moon' }
    ]

    return {
      currentTheme,
      themeOptions,
      setTheme
    }
  }

}
</script>