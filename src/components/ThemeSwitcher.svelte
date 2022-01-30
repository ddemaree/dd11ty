<script lang="ts">
import { themeSetting } from '../scripts/darkMode';
import { afterUpdate } from 'svelte'
import { icon } from '@fortawesome/fontawesome-svg-core'
import { faSun, faMoon, faCircle } from '@fortawesome/free-solid-svg-icons'

const lightIcon = icon(faSun)
const darkIcon = icon(faMoon)

const themeOptions = [
  { key: 'light', icon: 'sun', iconHtml: lightIcon.html  },
  { key: 'dark',  icon: 'moon', iconHtml: darkIcon.html }
]

let currentTheme: string;

themeSetting.subscribe(themeValue => {
  currentTheme = themeValue
});

afterUpdate(() => {
  themeSetting.set(currentTheme);
});
</script>

<div class={`theme-switch theme-switch--${currentTheme}`}>
  {#each themeOptions as themeOption}
  <label class="theme-option" class:active={currentTheme === themeOption.key}>
    {@html themeOption.iconHtml}
    <input
      type="radio"
      name="theme-toggle"
      class="sr-only"
      bind:group={currentTheme}
      value={themeOption.key}
      />
  </label>
  {/each}
</div>

<style>
  .theme-switch {
    --ts-size: 1.75rem;
    @apply flex rounded-full relative border-[2px] z-[1];
    border-color: var(--ts-background);
    background-color: var(--ts-background);
  }

  .theme-option, .theme-switch::after {
    @apply w-[var(--ts-size)] h-[var(--ts-size)];
  }

  .theme-option {
    @apply flex items-center justify-center relative z-20 rounded-full;
    color: var(--ts-inactive);
  }

  .theme-option.active {
    @apply text-ink-bold;
  }

  .theme-switch::after {
    @apply rounded-full bg-surface absolute left-0 top-0;
    display: block;
    content: '';
    transition: all 0.3s;
  }

  .theme-switch--dark::after {
    transform: translateX(100%);
  }

</style>