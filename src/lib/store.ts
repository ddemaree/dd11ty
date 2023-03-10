import { map, onMount } from "nanostores";
import { useStore } from "@nanostores/react";

const FakeMediaQuery = {
  matches: false,
  addEventListener() {},
  removeEventListener() {},
};

const { window } = globalThis;
const mq = window ? window.matchMedia("(max-width: 600px)") : FakeMediaQuery;

export interface SiteStateData {
  menuOpen: boolean;
  colorScheme: "light" | "dark" | "system";
  isSmallScreen: boolean | null;
}

const siteState = map<SiteStateData>({
  menuOpen: false,
  colorScheme: "light",
  isSmallScreen: mq.matches,
});

onMount(siteState, () => {
  // Tricking Astro into allowing client side JS in code that is also used on the server
  if (window && mq) {
    function onMqChange(mqEvt) {
      siteState.setKey("isSmallScreen", mqEvt.matches);
    }
    mq.addEventListener("change", onMqChange);
    return () => mq.removeEventListener("change", onMqChange);
  }
});

function useSiteState() {
  return useStore(siteState);
}

export { map, siteState, useSiteState };
