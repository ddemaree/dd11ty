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
      <VStack className="post-header-inner mx-auto text-center @container/post-header">
        <h1 className="balance-text text-4xl/none text-[clamp(30px,9vw,44px)] font-medium text-dd-text-bold">
          <Balancer>{title}</Balancer>
        </h1>
        {subtitle && (
          <div className="balance-text post-header__subtitle mt-3 text-2xl leading-snug text-stone-500 dark:text-stone-400">
            <Balancer>{subtitle}</Balancer>
          </div>
        )}
        <div className="mt-4 text-lg font-semibold uppercase">
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
