/// <reference types="astro/client-image" />

import type { ColorScheme } from "./lib/siteStore";
import "./types/image-generation";
import "./types/metadata";
import "@lib/wordpress/types";

declare global {
  interface Window {
    DD: {
      setTheme: (theme: ColorScheme, persist?: boolean) => void;
      getComputedSystemTheme: () => "light" | "dark";
      getDarkModeQuery: () => MediaQueryList | null;
      userThemeSelection: string;
      theme: string;
      systemTheme: string;
      arcAvailable: boolean;
    };
  }
}
