"use client";

import useTextBalancer from "@lib/hooks/useTextBalancer";
import { HTMLAttributes } from "react";
import Text from "./homeContent.mdx";

export default function HomeContent() {
  useTextBalancer(".balance-text");

  const components = {
    p: (props: HTMLAttributes<HTMLParagraphElement>) => (
      <p className="balance-text [text-wrap:balance]" {...props} />
    ),
  };

  return (
    <>
      <Text components={components} />
    </>
  );
}
