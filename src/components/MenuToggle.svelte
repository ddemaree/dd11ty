<script lang="ts">
let className: string = '';
export { className as class };
console.log(className);

import c from 'classnames';
import { fly, fade } from 'svelte/transition';
import { faFeather, faUserNinja } from '@fortawesome/free-solid-svg-icons'
import MenuItem from './MenuItem.svelte'

let menuOpen = false;

const toggleMenu = () => { menuOpen = !menuOpen }

const localClassName = c('bison-burger', className);
console.log(localClassName);
</script>

<div class={localClassName} class:open={menuOpen}>
  <button on:click={toggleMenu}>
    <i class="bar bar-top" aria-hidden="true"></i>
    <i class="bar bar-middle" aria-hidden="true"></i>
    <i class="bar bar-bottom" aria-hidden="true"></i>
    <span class="sr-only">Menu</span>
  </button>
</div>

{#if menuOpen}
<div transition:fade={{duration:300}} class="absolute inset-0 bg-black/30 sm:backdrop-blur-sm"></div>
<div
  class="absolute z-20 right-0 top-0 bg-neutral-100 dark:bg-black w-full sm:w-[380px] pt-[var(--header-height,_4rem)] h-screen"  
  transition:fly={{duration: 300, x: (window.screen.width), y: 0, opacity: 100}} 
  on:introstart="{() => document.body.classList.add('overflow-hidden', 'h-screen', 'w-screen')}"
  on:outroend="{() => document.body.classList.remove('overflow-hidden', 'h-screen', 'w-screen')}"
  >
  <nav class="max-w-sm mx-auto">
    <ul class="text-2xl sm:text-4xl space-y-3 p-[var(--inset-x)]">
      <MenuItem title="About Me" href="/about" iconDef={faUserNinja} />
      <MenuItem title="Archives" href="/archives" iconDef={faFeather} />
    </ul>
  </nav>
</div>
{/if}

<style lang="scss">
.bison-burger {
  @apply font-sans z-30;
  width: 20px;
  height: 20px;
  position: relative;
}
  
.bison-burger * {
  all: unset;
}

.bison-burger button {
  position: relative;
  display: block;
  height: 100%;
  width: 100%;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.bar {
  position: absolute;
  width: 100%;
  height: 2px;
  left: 0;
  background-color: currentColor;
  transition: transform 0.25s ease;
}

.bar-top {
  transform: translateY(-7px);
}

.bar-middle {
  transform: translateY(0) scaleX(1.1);
  transform-origin: left center;
  top: 50%;
}

.bar-bottom {
  transform: translateY(7px);
}

.open .bar-top {
  transform: rotate(225deg);
}

.open .bar-middle {
  transform-origin: center;
  transform: translateY(-50%) scaleX(0);
}

.open .bar-bottom {
  transform: rotate(135deg);
}
</style>