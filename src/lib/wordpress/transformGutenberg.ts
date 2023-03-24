import { VFile } from "vfile";
import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import rehypeReact from "rehype-react";

import { createElement, Fragment } from "react";
import rehypeTransformGutenberg from "./rehypeGutenberg";

function rehypeProcessor() {
  return unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeTransformGutenberg);
}

function sanitizeInput(src: string) {
  return src.trim().replace(/\n{2,}/g, "\n\n");
}

export default async function transformGutenberg(
  src: string
): Promise<void | VFile> {
  const processor = rehypeProcessor().use(rehypeStringify);
  const out = await processor.process(sanitizeInput(src));
  return out;
}

export async function wpToReact(src: string) {
  const processor = rehypeProcessor().use(rehypeReact, {
    createElement,
    Fragment,
  });

  const out = await processor.process(sanitizeInput(src));
  return () => out.result;
}
