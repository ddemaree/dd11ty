import { describe, expect, test } from "./fixture";
import * as cheerio from "cheerio";
import transformGutenberg from "@lib/wordpress/transformGutenberg";

describe("Transform Gutenberg HTML", () => {
  test("handles tweets", async function ({ markdowns }) {
    const fileContent = markdowns["elden-ring.html"];
    const result = await transformGutenberg(fileContent);

    expect(result).toBeTruthy();

    if (result) {
      const doc = cheerio.load(result.toString());
      expect(doc(".dd-embed-tweet")).toBeTruthy();
    }
  });
});
