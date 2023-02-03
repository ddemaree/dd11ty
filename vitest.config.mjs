/// <reference types="vitest" />
import { getViteConfig } from "astro/config";

const myConfig = {
  test: {
    globals: true,
    deps: {
      inline: ["vitest-fixture"],
    },
  },
};

export default getViteConfig(myConfig);
