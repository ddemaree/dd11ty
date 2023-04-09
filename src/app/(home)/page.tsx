import { type HTMLAttributes } from "react";
import { type Metadata } from "next";
import Image from "next/image";

import { siteUrl } from "@lib/urls";
import { Stack } from "@components/Layout";
import MyLinks from "@components/MyLinks";
// import BalanceText from "@components/BalanceText";
import Balance from "react-wrap-balancer";

import imgDavidStitch from "@/assets/images/dd-stitch-transparent.png";
import Text from "./homeContent.mdx";
import styles from "./styles.module.css";

export const metadata: Metadata = {
  alternates: {
    canonical: siteUrl("/", true),
  },
};

export default async function HomePage() {
  const components = {
    p: (props: HTMLAttributes<HTMLParagraphElement>) => (
      <p className="balance-text [text-wrap:balance]">
        <Balance>{props.children}</Balance>
      </p>
    ),
  };
  return (
    <Stack
      as="main"
      direction="column"
      className={
        "pb-20 px-inset align-middle self-center justify-self-center @container/intro w-full max-w-3xl"
      }
    >
      <figure className={`${styles.fadeMask} w-max min-w-[100px]`}>
        <Image
          src={imgDavidStitch}
          alt="A man in a ridiculous hat"
          className="dark:mix-blend-multiply dark:opacity-80"
          width={240}
          priority
        />
      </figure>
      <Stack direction="column" className="gap-[2rem]">
        <div className="prose prose-h1:m-0 prose-h1:-mt-[0.125em] prose-h1:text-5xl/none flex flex-col items-center text-center [--prose-flow-spacing-normal:1ex]">
          <Text components={components} />
        </div>
        <MyLinks
          className="flex gap-4 justify-center"
          variant={null}
          showLabels={false}
        />
      </Stack>
    </Stack>
  );
}
