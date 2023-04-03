"use client";

import DisplayDate from "@components/DisplayDate";
import { VStack } from "@components/Layout";
import useTextBalancer from "@lib/hooks/useTextBalancer";
import { useEffect, useRef } from "react";
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
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  useTextBalancer(titleRef, subtitleRef);

  return (
    <header className="post-header w-full max-w-content px-inset py-8 md:py-10">
      <VStack className="post-header-inner @container/post-header mx-auto text-center">
        <h1
          ref={titleRef}
          className="font-medium text-stone-950 text-4xl/none text-[clamp(30px,9vw,44px)]"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        {subtitle && (
          <div
            ref={subtitleRef}
            className="post-header__subtitle text-stone-500 dark:text-stone-400 text-2xl leading-snug mt-3"
            dangerouslySetInnerHTML={{ __html: subtitle }}
          />
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
