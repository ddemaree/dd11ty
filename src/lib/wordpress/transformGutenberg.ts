import type { Element } from "hast";

import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import rehypeReact, { type Options } from "rehype-react";

import { createElement, Fragment, HTMLAttributes, SVGAttributes } from "react";
import rehypeTransformGutenberg from "./rehypeGutenberg";

function rehypeProcessor() {
  return unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeTransformGutenberg);
}

function sanitizeInput(src: string) {
  return src.trim().replace(/\n{2,}/g, "\n\n");
}

export default async function transformGutenberg(src: string): Promise<string> {
  const processor = rehypeProcessor().use(rehypeStringify);
  const out = await processor.process(sanitizeInput(src));
  return out.toString("utf-8");
}

const defaultOptions: Options = {
  createElement,
  Fragment,
  passNode: true,
};

export type ComponentOptions = (typeof defaultOptions)["components"];

export type ElementProps<T> =
  | (HTMLAttributes<T> & { node?: Element })
  | (SVGAttributes<T> & { node?: Element });

export async function wpToReact(
  src: string,
  components: ComponentOptions = undefined
) {
  const opts = { ...defaultOptions, components };

  const processor = rehypeProcessor().use(rehypeReact, opts as Options);

  const out = await processor.process(sanitizeInput(src));
  return () => out.result;
}
