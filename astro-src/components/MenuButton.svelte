<script>
import { onMount } from 'svelte';
import { LottiePlayer } from '@lottiefiles/svelte-lottie-player';

let lottieComponent, lottie, menuContainer;
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
  menuContainer = document.querySelector('.menu-container');
})

function getTimeout(delays, durations) {
  while (delays.length < durations.length) {
    delays = delays.concat(delays)
  }
  return Math.max(...durations.map((d, i) => toMs(d) + toMs(delays[i])))
}

// Old versions of Chromium (below 61.0.3163.100) formats floating pointer
// numbers in a locale-dependent way, using a comma instead of a dot.
// If comma is not replaced with a dot, the input will be rounded down
// (i.e. acting as a floor function) causing unexpected behaviors
function toMs(s) {
  return Number(s.slice(0, -1).replace(',', '.')) * 1000
}

function forceReflow() {
  return document.body.offsetHeight
}

function nextFrame(cb) {
  requestAnimationFrame(() => {
    requestAnimationFrame(cb)
  })
}

function whenTransitionEnds(el, resolve) {
  const cleanupEnd = () => {
    el.removeEventListener('transitionend', onEnd);
    resolve();
  }

  const onEnd = () => {
    cleanupEnd();
  }

  const sty = window.getComputedStyle(el);
  const getStyleProperties = (key) =>
    (sty[key] || '').split(', ')

  const timeout = getTimeout(getStyleProperties('transitionDelay'), getStyleProperties('transitionDuration'));

  setTimeout(cleanupEnd, timeout + 1);

  el.addEventListener('transitionend', onEnd);
}

const enterFromClass = `enter-from`;
const enterToClass = `enter-to`;
const enterActiveClass = `enter-active`;
const leaveFromClass = `leave-from`;
const leaveToClass = `leave-to`;
const leaveActiveClass = `leave-active`;

function addTransitionClass(el, cls) {
  cls.split(/\s+/).forEach(c => c && el.classList.add(c))
  ;(
    (el)._vtc ||
    ((el)._vtc = new Set())
  ).add(cls)
}

function removeTransitionClass(el, cls) {
  cls.split(/\s+/).forEach(c => c && el.classList.remove(c))
  const { _vtc } = el
  if (_vtc) {
    _vtc.delete(cls)
    if (!_vtc.size) {
      ;(el)._vtc = undefined
    }
  }
}

function enterTransition(el, cb) {
  addTransitionClass(el, enterFromClass);
  addTransitionClass(el, enterActiveClass);
  
  nextFrame(() => {
    removeTransitionClass(el, enterFromClass);
    addTransitionClass(el, enterToClass);

    whenTransitionEnds(el, () => {
      removeTransitionClass(el, enterToClass);
      removeTransitionClass(el, enterActiveClass);
      cb && cb();
    })
  })
}

function leaveTransition(el, cb) {
  addTransitionClass(el, leaveFromClass);
  addTransitionClass(el, leaveActiveClass);

  forceReflow(); // Not sure why this is needed but w/e
  nextFrame(() => {
    removeTransitionClass(el, leaveFromClass);
    addTransitionClass(el, leaveToClass);
    whenTransitionEnds(el, () => {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
      cb && cb();
    })
  })
}


function toggleOpen() {
  if(menuOpen) {
    leaveTransition(menuContainer, () => {
      menuOpen = false;
    });
    lottie.goToAndStop(36, true);
    lottie.playSegments([36, 86], true);
  } else {
    menuOpen = true;
    enterTransition(menuContainer);

    lottie.goToAndStop(0, true);
    lottie.playSegments([0, 36], true);
  }
}
</script>

<div class="menu-button">
  <button on:click={toggleOpen}>
    <LottiePlayer bind:this={lottieComponent} id="burgerLottie" src="/lottie/burger-menu.json"  background="transparent" speed="2" width="40" height="40" />
    <span class="sr-only">Menu</span>
  </button>
</div>

<style>

.menu-button button {
  all: unset;
  border: 0;
}

</style>