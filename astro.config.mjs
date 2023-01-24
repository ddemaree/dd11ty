import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import solid from "@astrojs/solid-js";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel/serverless";
import image from "@astrojs/image";
import svelte from "@astrojs/svelte";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  srcDir: "./src",
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
  }), svelte(), react()]
});