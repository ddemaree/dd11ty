import type { FunctionComponent, HTMLAttributes } from "react";
import type { Metadata } from "next";

import Image from "next/image";

import { siteUrl } from "@/utils";
import { Stack } from "@components/Layout";
import MyLinks from "@components/MyLinks";
import Balance from "react-wrap-balancer";

import imgDavidStitch from "./dd-stitch-transparent.png";
import Text from "./homeContent.mdx";
import styles from "./styles.module.css";
import getPage from "@lib/wordpress/getPage";
import {
  wpToReact,
  type ComponentOptions,
  type ElementProps,
} from "@lib/wordpress/transformGutenberg";

import { matches } from "hast-util-select";

import clsx from "clsx";

export const metadata: Metadata = {
  alternates: {
    canonical: siteUrl("/", true),
  },
};

export default async function HomePage() {
  const page = await getPage("home");
  // console.log(page);

  const components = {
    p: (props: ElementProps<HTMLParagraphElement>) => (
      <p className="balance-text [text-wrap:balance]">
        <Balance>{props.children}</Balance>
      </p>
    ),
    ul: ({ node, children, ...props }: ElementProps<HTMLUListElement>) => (
      <ul className="flex flex-row gap-[1em]">{children}</ul>
    ),
    path: ({ node, ...props }: ElementProps<SVGPathElement>) => (
      <path fill="currentColor" {...props} />
    ),
    svg: ({ node, ...props }: ElementProps<SVGElement>) => (
      <svg {...props} style={{ height: "1em", width: "auto" }} />
    ),
    span: ({ node, ...props }: ElementProps<HTMLSpanElement>) => {
      if (matches(".screen-reader-text", node)) {
        props.className = clsx(props.className, "sr-only");
      }

      return <span {...props} />;
    },
    a: ({ children, node, ...props }: ElementProps<HTMLAnchorElement>) => {
      const properties = node?.properties || { className: [] };

      if (
        (properties.className as string[]).includes(
          "wp-block-social-link-anchor"
        )
      ) {
        props.className = clsx(
          props.className,
          "inline-flex flex-row items-center gap-[0.5em]"
        );
      }

      return <a {...props}>{children}</a>;
    },
  };

  const Content = await wpToReact(page!.content, components);

  return (
    <>
      <main>
        <div className="grid auto-rows-auto gap-[1em] text-4xl leading-tight">
          <Content />
        </div>
      </main>
      <Stack
        as="main"
        direction="column"
        className={
          "hidden w-full max-w-3xl self-center justify-self-center px-inset pb-20 align-middle @container/intro"
        }
      >
        <figure className={`${styles.fadeMask} w-max min-w-[100px]`}>
          <Image
            src={imgDavidStitch}
            alt="A man in a ridiculous hat"
            className="dark:opacity-70 dark:mix-blend-multiply"
            width={240}
            priority
          />
        </figure>
        <Stack direction="column" className="gap-[2rem]">
          <div className="prose flex flex-col items-center text-center [--prose-flow-spacing-normal:1ex] dark:prose-dark prose-h1:m-0 prose-h1:-mt-[0.125em] prose-h1:text-5xl/none">
            <Text components={components} />
          </div>
          <MyLinks
            className="flex justify-center gap-4"
            variant={null}
            showLabels={false}
          />
        </Stack>
      </Stack>
    </>
  );
}
