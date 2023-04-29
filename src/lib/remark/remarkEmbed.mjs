/** @format */

import { visit } from "unist-util-visit";
import { fromHtml } from "hast-util-from-html";
import { toHtml } from "hast-util-to-html";
import hastTransformTweet from "./rehypeTransformTweets/hastTransformTweet.mjs";

function isTweet(url) {
  url = new URL(url);
  return url.hostname === "twitter.com" && url.pathname.match(/\/status\/\d+/);
}

/**
 * Fetches the oEmbed HTML for a tweet
 *
 * @param {string | URL} url - A valid Twitter URL
 * @returns {null | Promise<string>}
 * */
function fetchTweetOembed(url) {
  if (!isTweet(url)) return null;

  const oEmbedUrl = `https://publish.twitter.com/oembed?dnt=true&url=${url.toString()}`;
  return fetch(oEmbedUrl)
    .then((res) => res.json())
    .then((json) => json.html);
}

export function remarkEmbeds() {
  const transform = async (tree) => {
    /** @type {Promise<any>[]} */
    const promises = [];

    const transformTweet = (node) => {
      if (
        node.type === "paragraph" &&
        node.children &&
        node.children[0]?.type === "link"
      ) {
        const firstLink = node.children[0];
        const url = new URL(firstLink.url);

        if (isTweet(url)) {
          promises.push(
            fetchTweetOembed(url).then((html) => {
              const hast = fromHtml(html, { fragment: true });
              const twHast = hastTransformTweet(hast);
              const twHtml = toHtml(twHast);

              node.type = "html";
              node.value = twHtml;
              node.children = [];
            })
          );
        }
      }
    };

    // Find paragraphs that contain only a link
    visit(tree, "paragraph", transformTweet);
    visit(tree, "text", transformTweet);

    await Promise.all(promises);
  };

  return transform;
}
