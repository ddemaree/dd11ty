import BalanceText from "@components/BalanceText";
import { HTMLAttributes, Suspense } from "react";
import Text from "./homeContent.mdx";

export default function HomeContent() {
  const components = {
    p: (props: HTMLAttributes<HTMLParagraphElement>) => (
      <p className="balance-text [text-wrap:balance]" {...props} />
    ),
  };

  return (
    <>
      <Text components={components} />
      <Suspense fallback={<></>}>
        <BalanceText />
      </Suspense>
    </>
  );
}
