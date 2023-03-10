import path from "path";
import { test as base } from "vitest-fixture";
export { describe, expect } from "vitest";

type MarkdownMap = { [index: string]: string };

export const test = base.extend<{ name: string; markdowns: MarkdownMap }>({
  name: "fixed-value",
  markdowns: async ({}, use) => {
    let mdFixtureMap: MarkdownMap = {};

    let _mdFiles = await import.meta.glob("./data/*.{md,html}", {
      eager: true,
      as: "raw",
    });

    mdFixtureMap = Object.keys(_mdFiles).reduce((obj, currentKey) => {
      const currentMdSrc = _mdFiles[currentKey];
      const filename = path.basename(currentKey);
      obj[filename] = currentMdSrc;
      return obj;
    }, {});

    await use(mdFixtureMap, async () => {
      mdFixtureMap = {};
    });
  },
});
