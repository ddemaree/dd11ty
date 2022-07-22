import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind"; // import preact from "@astrojs/preact";

import solid from "@astrojs/solid-js";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://demaree.me",
  integrations: [solid(), tailwind(), mdx()]
});