import { defineConfig } from "vite";

export default defineConfig({
  outDir: "_site", 
  build: {
    assetsDir: "assets",
    sourcemap: true,
    manifest: true,
    ssrManifest: true,
    emptyOutDir: false,
    rollupOptions: {
      input: "assets/main.js",
    },
  },
});
