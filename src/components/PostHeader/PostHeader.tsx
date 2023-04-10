import { VStack } from "@components/Layout";
import DisplayDate from "@components/DisplayDate";

import Balancer from "react-wrap-balancer";

import "./PostHeader.scss";

export default function PostHeader({
  title,
  subtitle,
  date,
  isDraft = false,
}: {
  title: string;
  subtitle?: string;
  date: string;
  isDraft?: boolean;
}) {
  return (
    <header className="post-header w-full max-w-content px-inset py-8 md:py-10">
      <VStack className="post-header-inner @container/post-header mx-auto text-center">
        <h1 className="balance-text font-medium text-stone-950 text-4xl/none text-[clamp(30px,9vw,44px)]">
          <Balancer>{title}</Balancer>
        </h1>
        {subtitle && (
          <div className="balance-text post-header__subtitle text-stone-500 dark:text-stone-400 text-2xl leading-snug mt-3">
            <Balancer>{subtitle}</Balancer>
          </div>
        )}
        <div className="font-semibold uppercase mt-4 text-lg">
          {!isDraft && date && <DisplayDate dateString={date} />}
          {isDraft && (
            <span>
              <span className="text-red-400">Draft</span>
              {date && (
                <>
                  {" — "}
                  <DisplayDate dateString={date} />
                </>
              )}
            </span>
          )}
        </div>
      </VStack>
    </header>
  );
}
