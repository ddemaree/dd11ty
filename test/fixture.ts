/// <reference types="vitest" />

import path from "path";
import { test as testWithFixture } from "vitest-fixture";

type MarkdownMap = { [index: string]: string };

interface MarkdownFixture {
  markdowns: MarkdownMap;
}

export const test = testWithFixture.extend<MarkdownFixture>({
  markdowns: async ({ }, use) => {
    let mdFixtureMap: MarkdownMap = {};

    let _mdFiles = await import.meta.glob("./data/*.md", {
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
