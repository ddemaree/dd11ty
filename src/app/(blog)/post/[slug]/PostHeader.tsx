"use client";

import DisplayDate from "@components/DisplayDate";
import useTextBalancer from "@lib/hooks/useTextBalancer";
import { useRef } from "react";
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
    <header className="post-header py-8 md:py-10">
      <div className="post-header-inner @container/post-header w-inset max-w-content mx-auto text-center flex flex-col items-center">
        <h1
          ref={titleRef}
          className="font-medium text-stone-900 dark:text-white text-5xl leading-none font-serif-headline"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        {subtitle && (
          <div
            ref={subtitleRef}
            className="post-header__subtitle text-stone-500 dark:text-stone-400 text-2xl leading-snug mt-3"
            dangerouslySetInnerHTML={{ __html: subtitle }}
          />
        )}
        {!isDraft && date && (
          <div className="font-semibold uppercase mt-4 text-lg">
            <DisplayDate dateString={date} />
          </div>
        )}
      </div>
    </header>
  );
}
