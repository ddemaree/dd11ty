import { describe, expect } from "vitest";
import { test } from "./fixture";

import { renderMarkdown } from "@astrojs/markdown-remark";

import { unified } from "unified";
import rehypeParse from "rehype-parse";
import { select } from "hast-util-select";

import remarkEmbed from "@lib/remarkEmbed";

describe("Remark plugin", () => {
  test("converts twitter embeds", async ({ markdowns }) => {
    const src = markdowns["embed_test.md"];
    const fileURL = new URL("./test/data/embed_test.md", `file://${__dirname}`);

    const output = await renderMarkdown(src, {
      fileURL,
      contentDir: new URL("./test/data", `file://${__dirname}`),
      remarkPlugins: [remarkEmbed],
      frontmatter: {},
    });

    const parser = unified().use(rehypeParse);
    const parsedHtml = await parser.parse(output.code);

    const tweet = select("blockquote.twitter-tweet", parsedHtml);
    expect(tweet).toBeTruthy();
  });
});
