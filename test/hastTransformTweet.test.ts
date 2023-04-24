/** @format */

import { beforeEach, describe, expect } from "vitest";
import { test } from "./fixture";
import hastTransformTweet from "../src/lib/remark/rehypeTransformTweets/hastTransformTweet.mjs";
import fetchTweets from "../src/lib/twitter/fetchTweets";
import TweetContentHast from "../src/lib/twitter/TweetContentHast";

import { fromHtml } from "hast-util-from-html";
import { toHtml } from "hast-util-to-html";
import { select } from "hast-util-select";

describe("hastTransformTweet", () => {
  test("reformats oEmbed markup", async ({ markdowns }) => {
    const source = markdowns["tweet-oembed.html"];
    const hast = fromHtml(source, { fragment: true });

    const result = await hastTransformTweet(hast);

    if (!result) return;

    document.body.innerHTML = toHtml(result);

    const r = select(".tweet-content", result);
    expect(r).toBeTruthy();

    const link = select(".tweet-content a", result);
    expect(link).toBeTruthy();

    const linkElem = document.body.querySelector(
      ".tweet-content a"
    ) as HTMLAnchorElement;
    expect(linkElem).toBeTruthy();
    expect(linkElem?.href).toBe("https://t.co/L2IVVtn3er");
  });

  test("formats tweet API data", async ({ markdowns }) => {
    const source = markdowns["tweet-oembed.html"];

    function extractTweetIds(source: string) {
      const matches = source.match(/twitter\.com\/.+\/status\/(\d+)/g);
      return matches
        ?.map((m) => m.match(/twitter\.com\/.+\/status\/(\d+)/)?.at(1))
        .map((m) => String(m));
    }

    const tweetIds = extractTweetIds(source);
    expect(tweetIds).toContain("1573846119527972865");

    const twResult = await fetchTweets(tweetIds);
    console.log(twResult, TweetContentHast({ parts: [], quoteLevel: 0 }));
  });
});
