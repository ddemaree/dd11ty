/// <reference types="vitest" />

import { getViteConfig } from "astro/config";

export default getViteConfig({
  // plugins: [react()],
  test: {
    globals: true,
    deps: {
      inline: ["vitest-fixture"],
    },
    environment: 'jsdom',
  },
});
