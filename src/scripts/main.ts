// import { createApp } from 'petite-vue'
import { themeSetting, setDarkMode } from './darkMode'
themeSetting.subscribe(value => {
  setDarkMode(value)
})