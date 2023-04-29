import { SKIP, visit } from "unist-util-visit";
import { isJavaScript } from 'hast-util-is-javascript'
import rehypeParse from "rehype-parse";

import { rehype } from "rehype";
import { unified } from "unified";
import rehypeStringify from "rehype-stringify";

/**
 * Remove JS nodes from raw HTML
 *
 * @type {import('unified').Plugin<Array<void>, Root>}
 */
export function rehypeNoScript() {

  const removeJSNodes = (tree) => {
    visit(tree, "element", (node, index, parent) => {
      if (isJavaScript(node)) {
        parent.children.splice(index, 1);
      }
    });
  }

  return async function (tree) {
    // If script tags are directly embedded, remove them
    removeJSNodes(tree);

    const jobs = [];

    // If script tags are in raw HTML, remove them
    visit(tree, "raw", (node, index, parent) => {
      const innerProcessor = unified().use(rehypeParse, { fragment: true });

      innerProcessor.use(() => removeJSNodes);

      innerProcessor.use(rehypeStringify);

      jobs.push(innerProcessor.process(node.value).then((file) => {
        node.value = file.toString();
      }));
    });

    await Promise.all(jobs);
  }
}