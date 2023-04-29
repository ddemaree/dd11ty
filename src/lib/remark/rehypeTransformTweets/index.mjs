import { rehype } from "rehype";
import { visit } from "unist-util-visit";
import { matches as hastMatches } from "hast-util-select";
import { matches as unistMatches } from "unist-util-select";

import hastTransformTweet from "./hastTransformTweet";

export function rehypeTransformTweets() {
  return async (tree) => {
    const nodesToTransform = [];

    const testNode = (node) => {
      if (hastMatches("figure.wp-block-embed-twitter", node)) {
        return true;
      } else if (unistMatches("raw", node) && node.value) {
        return node.value.includes("twitter-tweet");
      }

      return false;
    };

    visit(tree, testNode, (node, index, parent) => {
      nodesToTransform.push({ node, index, parent });
      return "skip";
    });

    const innerProcessor = rehype({ fragment: true }).use(hastTransformTweet);

    await Promise.all(
      nodesToTransform.map(({ node, index, parent }) => {
        if (unistMatches("raw", node)) {
          node = innerProcessor.parse(node.value);
        }

        const tweetNode = hastTransformTweet(node);

        if (index && parent) {
          parent.children.splice(index, 1, tweetNode);
        }
      })
    );
  };
}
