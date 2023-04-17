import { map, action, onMount } from "nanostores";
import { useStore } from "@nanostores/react";

export type ColorScheme = "system" | "light" | "dark" | "arc";
export type SystemColorScheme = "light" | "dark";

export interface SiteStore {
  menuOpen: boolean;
  theme: ColorScheme;
  systemTheme: SystemColorScheme | null;
}

let currentTheme: ColorScheme = "system";
let currentSystemTheme: SystemColorScheme | null = null;

// If we're in the client, we have this data already
if (typeof window !== "undefined") {
  currentTheme = window.DD.theme as ColorScheme;
  currentSystemTheme = window.DD.getComputedSystemTheme();
}

const siteStore = map<SiteStore>({
  menuOpen: false,
  theme: currentTheme,
  systemTheme: currentSystemTheme,
});

const toggleMenu = action(siteStore, "toggleMenu", (siteStore) => {
  siteStore.setKey("menuOpen", !siteStore.get().menuOpen);
});

export default siteStore;

export function watchSystemTheme(cb: (theme: SystemColorScheme) => void) {
  if (typeof window === "undefined") return;
  const mq = window.DD.getDarkModeQuery();
  if (!mq) return;

  const listener = () => {
    siteStore.setKey("systemTheme", mq.matches ? "dark" : "light");
    cb(mq.matches ? "dark" : "light");
  };

  mq.addEventListener("change", listener);

  // Do we need to remove the listener?
}

export function useSiteStore() {
  const store = useStore(siteStore);

  return {
    ...store,
    toggleMenu,
    setTheme(theme: ColorScheme) {
      if (typeof window === "undefined") return;
      window.DD.setTheme(theme);
    },
  };
}
