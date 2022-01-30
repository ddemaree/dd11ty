import { writable } from 'svelte/store'
export { get } from 'svelte/store'

export function getInitialDarkMode() {
  return (getInitialTheme() === 'dark');
}

export function setDarkMode(themeValue: string, persist: boolean = false) {
  const root = document.documentElement;

  if(themeValue === 'dark') {
    root.classList.add('dark')
  }
  else {
    root.classList.remove('dark')
  }

  if(persist) localStorage.setItem('theme', themeValue);
}

function getDarkModeQuery() {
  return import.meta.env.SSR ? window.matchMedia('(prefers-color-scheme: dark)') : null;
} 

export function getInitialTheme() {
  if(import.meta.env.SSR) {
    return null;
  }

  const darkModeQuery = getDarkModeQuery()

  if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
    return localStorage.getItem('theme');
  }
  else if (darkModeQuery.matches) {
    return 'dark';
  }
  else {
    return 'light';
  }
}

export const themeSetting = writable( getInitialTheme() );