import { defineConfig } from "vite";
import { join } from 'path'
// import legacy from "@vitejs/plugin-legacy";

console.log("Loading Vite config…")

export default defineConfig({
  build: {
    outDir: "_site",
    assetsDir: "assets",
    sourcemap: true,
    manifest: true,
    rollupOptions: {
      input: join(process.cwd(), "src/client/main.js"),
    },
  },
});
