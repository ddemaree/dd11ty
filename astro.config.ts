import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import image from "@astrojs/image";
import svelte from "@astrojs/svelte";
import react from "@astrojs/react";
import path from "path";

import { site, remarkPlugins, shikiConfig } from "./src/lib/sharedConfig";

import vercel from "@astrojs/vercel/serverless";
import netlify from "@astrojs/netlify/edge-functions";

let output = "static";
let adapter = null;

if (process.env.NETLIFY || import.meta.env.NETLIFY) {
  output = "server";
  adapter = netlify();
} else if (process.env.VERCEL || import.meta.env.VERCEL) {
  output = "server";
  adapter = vercel();
}

// import vercel from "@astrojs/vercel/serverless";
export default defineConfig({
  srcDir: "./src",
  // TODO: Allow the site property to be overridden via env var or something?
  site,
  output,
  adapter,

  markdown: {
    shikiConfig,
    remarkPlugins,
  },
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    mdx(),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
    svelte(),
    react(),
  ],
  vite: {
    resolve: {
      alias: {
        "~": path.resolve(process.cwd(), "src"),
      },
    },
  },
});
