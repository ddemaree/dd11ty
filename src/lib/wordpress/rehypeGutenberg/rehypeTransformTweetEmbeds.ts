import type { Root, Element } from "hast";
import { visit } from "unist-util-visit";
import hastTransformTweet from "./hastTransformTweet";

export default function rehypeTransformWPTweetEmbeds() {
  return async (tree: Root) => {
    const nodesToTransform: Array<{
      node: Element;
      index: number | null;
      parent: Element | Root | null;
    }> = [];

    visit(tree, "element", (node, index, parent) => {
      const { tagName, properties } = node;

      if (
        tagName === "figure" &&
        (properties?.className as string[])?.includes("wp-block-embed-twitter")
      ) {
        nodesToTransform.push({ node, index, parent });
        return "skip";
      }
    });

    await Promise.all(
      nodesToTransform.map(({ node, index, parent }) => {
        const tweetNode = hastTransformTweet(node);
        if (index && parent) {
          parent.children.splice(index, 1, tweetNode);
        }
      })
    );
  };
}
