import type { HTMLAttributes } from "react";

// @ts-ignore
import HomeParagraph from "./HomeParagraph.astro";
import clsx from "clsx";

function Heading({ children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  props.className = clsx(props.className, "text-red-500 font-light")
  return (
    <h1 {...props}>{children}</h1>
  );
}

export { HomeParagraph, Heading };
