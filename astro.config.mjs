import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";

import { rehypePlugins, remarkPlugins } from "./src/lib/remark";

// https://astro.build/config
export default defineConfig({
  experimental: {
    assets: true,
  },
  image: {
    service: "astro/assets/services/sharp",
  },
  markdown: {
    remarkPlugins,
    rehypePlugins,
    remarkRehype: {
      allowDangerousHtml: true,
    },
  },
  output: "server",
  adapter: vercel({
    analytics: true,
  }),
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    mdx(),
  ],
});
