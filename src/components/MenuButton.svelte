<script>
import { onMount } from 'svelte';
import { LottiePlayer } from '@lottiefiles/svelte-lottie-player';

let lottieComponent, lottie;
let menuOpen = null;

$: {
  if(menuOpen) {
    document.documentElement.classList.add('menu-open');
  } else {
    document.documentElement.classList.remove('menu-open');
  }
}

onMount(() => {
  lottie = lottieComponent.getLottie();
})

function toggleOpen() {
  console.log(lottie);

  if(menuOpen) {
    lottie.goToAndStop(36, true);
    lottie.playSegments([36, 86], true);
  } else {
    lottie.goToAndStop(0, true);
    lottie.playSegments([0, 36], true);
  }

  menuOpen = !menuOpen;
}

</script>

<div class="menu-button relative z-50 sm:hidden">
  <button on:click={toggleOpen}>
    <LottiePlayer bind:this={lottieComponent} id="burgerLottie" src="/lottie/burger-menu.json"  background="transparent" speed="2" width="40" height="40" />
    <span class="sr-only">Menu</span>
  </button>
</div>