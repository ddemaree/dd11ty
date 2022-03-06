import { createApp } from 'petite-vue'

function getInitialTheme() {
  if(localStorage.getItem('theme')) {
    return localStorage.getItem('theme');
  }
  else if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  else {
    return 'light';
  }
}

createApp({
  currentTheme: getInitialTheme(),
  menuOpen: false,
  themes: [
    { key: 'light', icon: 'sun' },
    { key: 'dark',  icon: 'moon' }
  ],
  setupMenu(el) {
    el.querySelectorAll('li').forEach((item, index) => {
      item.style.setProperty('--delay', index);
    })
  },
  saveTheme() {
    console.log(`Saving theme ${this.currentTheme}`)
    localStorage.setItem('theme', this.currentTheme)
    localStorage.removeItem('darkMode')
  }
}).mount()