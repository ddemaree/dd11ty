<script>
// import { icon } from '@fortawesome/fontawesome-svg-core'

const themeOptions = [
  { key: 'light', icon: 'sun'  },
  { key: 'dark',  icon: 'moon' }
]

let currentTheme = 'dark';

function handleChange(e) {
  console.log(`Changing theme to ${e.value}`)
  currentTheme = e.value
}
</script>

<div class="text-xl">
  {#each themeOptions as themeOption}
  <label>
    {themeOption.key}
    <input
      type="radio"
      name="theme-toggle"
      class="sr-only"
      checked={currentTheme === themeOption.key}
      value={themeOption.key}
      on:change={handleChange}
      />
  </label>
  {/each}
</div>