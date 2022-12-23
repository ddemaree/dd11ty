import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import solid from "@astrojs/solid-js";
import mdx from "@astrojs/mdx";

// https://astro.build/config
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
import image from "@astrojs/image";

// https://astro.build/config
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: "https://demaree.me",
  output: "server",
  adapter: vercel(),
  markdown: {
    shikiConfig: {
      theme: "dracula"
    }
  },
  integrations: [solid(), tailwind({
    config: {
      applyBaseStyles: false
    }
  }), mdx(), image({
    serviceEntryPoint: "@astrojs/image/sharp"
  }), svelte()]
});