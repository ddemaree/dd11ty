"use client";

import clsx from "clsx";
import { PropsWithChildren, HTMLAttributes, Fragment } from "react";

export default function Prose({
  content,
  children,
  as: AsTag = "div",
  className,
  ...props
}: PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    content: string;
    as?: "div" | "section" | "article" | "main";
  }
>) {
  return (
    <AsTag
      className={clsx("prose", className)}
      dangerouslySetInnerHTML={{ __html: content }}
      {...props}
    >
      {children}
    </AsTag>
  );
}
