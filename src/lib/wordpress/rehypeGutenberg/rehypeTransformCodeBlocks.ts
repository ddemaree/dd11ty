import type { Root, Element } from "hast";
import { select } from "hast-util-select";
import { SKIP, visit } from "unist-util-visit";
import { toText } from "hast-util-to-text";
import { fromHtml } from "hast-util-from-html";

export default function rehypeTransformCodeBlocks() {
  return async (tree: Root) => {
    const jobs: Promise<void>[] = [];

    visit(tree, "element", (node, index, parent) => {
      if (
        !index ||
        node.tagName !== "pre" ||
        !node.children ||
        !node.children.length ||
        !node.properties
      )
        return SKIP;

      const codeElement = select("code", node);
      if (!codeElement || !codeElement.properties) return SKIP;

      const allClassNames = [
        ...((codeElement.properties.className as string[]) || []),
        ...((node.properties.className as string[]) || []),
      ];

      const langClass = allClassNames.find((c) => c.startsWith("language-"));
      if (!langClass) return SKIP;
      const lang = langClass.split("-")[1];

      jobs.push(
        new Promise(async (resolve, reject) => {
          const { getHighlighter } = await import("shiki");

          const highlighter = await getHighlighter({
            theme: "github-dark",
          });

          const sourceCode = toText(codeElement, { whitespace: "pre" });
          const highlighted = highlighter.codeToHtml(sourceCode, lang);
          const hlRoot = fromHtml(highlighted, { fragment: true });

          const hlNode = select("pre", hlRoot);
          if (!hlNode) return reject("No pre node found in highlighted code");

          const hlCodeNode = select("code", hlNode);
          if (!hlCodeNode)
            return reject("No code node found in highlighted code");

          if (!hlNode.properties) hlNode.properties = {};
          if (!hlCodeNode.properties) hlCodeNode.properties = {};

          hlCodeNode.properties.className = hlNode.properties.className;
          hlCodeNode.properties.style = hlNode.properties.style;

          hlNode.properties.className = allClassNames;
          delete hlNode.properties.style;

          parent?.children.splice(index, 1, hlNode);
          resolve();
        })
      );
    });

    await Promise.all(jobs).catch((e) => console.error(e));
  };
}
