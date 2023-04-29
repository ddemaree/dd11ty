import type { WordpressPost } from "@/lib/wordpress";
import DisplayDate from "../DisplayDate";
import Prose from "../Prose";
import { blogPostUrl } from "@/utils";
import { faChevronRight } from "@fortawesome/sharp-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import React from "react";
import { Stack } from "../Layout";

export { PostHeader } from "./PostHeader";

export function BlogPost({ post }: { post: WordpressPost }) {
  const postIsVeryLong = post.wordCount > 1500;

  return (
    <article key={post.slug} className="@container/post-card">
      <a href={`/post/${post.slug}`}>
        <h2
          className="title text-4xl/none font-semibold text-dd-text-bold"
          dangerouslySetInnerHTML={{ __html: post.title }}
        />
      </a>
      <p className="publish-date dateline mt-[1ex] font-sans">
        <DisplayDate dateString={post.date} />
        {postIsVeryLong && (
          <>
            <span className="sep mx-1 opacity-50" aria-hidden>
              {" • "}
            </span>
            <span>{`${post.readingTime} min read`}</span>
          </>
        )}
      </p>

      {!postIsVeryLong && (
        <Prose
          as="main"
          className="!prose-simplified mt-8"
          content={post.renderedContent}
        />
      )}
      {postIsVeryLong && (
        <>
          <div
            className="my-3 max-w-[44ch] text-xl/smart"
            dangerouslySetInnerHTML={{ __html: post.excerpt }}
          />
          <div>
            <a
              href={blogPostUrl(post.slug)}
              className=" font-semibold text-red-500">
              Read post <FontAwesomeIcon size="sm" icon={faChevronRight} />
            </a>
          </div>
        </>
      )}
    </article>
  );
}

export function Pagination({
  pageNum,
  totalPages,
}: {
  pageNum: number;
  totalPages: number;
}) {
  const previousPage = pageNum - 1 < 0 ? null : pageNum - 1;
  const nextPage = pageNum + 1 > totalPages ? null : pageNum + 1;

  function pageUrl(pageNum: number): string {
    if (pageNum === 1) return `/posts`;
    else return `/posts/${pageNum}`;
  }

  function paginationClasses(
    addlClasses: string | string[] | undefined = undefined
  ): string {
    return clsx([
      addlClasses,
      "inline-flex px-[0.5em] py-[0.5em] leading-none bg-slate-200 rounded-lg",
    ]);
  }

  return (
    <div className="pagination flex flex-wrap justify-between gap-4 py-12 font-semibold [font-size:1.5rem] @md:justify-center">
      {previousPage ? (
        <a
          href={pageUrl(previousPage)}
          className={paginationClasses("previous")}>
          &larr; Newer
        </a>
      ) : (
        <span className="placeholder"></span>
      )}
      {nextPage ? (
        <a href={pageUrl(nextPage)} className={paginationClasses("next")}>
          Older &rarr;
        </a>
      ) : (
        <span className="placeholder"></span>
      )}
    </div>
  );
}

export default function BlogPostIndex({
  posts = [],
  pageNum = 1,
  totalPages = 1,
}: {
  posts: WordpressPost[];
  pageNum: number;
  totalPages: number;
}): JSX.Element {
  return (
    <Stack direction="column" className="py-[clamp(1.5rem,5vw,3rem)]">
      <section className="mx-auto flex w-inset max-w-content flex-col gap-y-10">
        {posts.map((post, index) => (
          <React.Fragment key={index}>
            {index > 0 && <hr className="my-8" />}
            <BlogPost key={post.slug} post={post} />
          </React.Fragment>
        ))}
      </section>
      {totalPages > 1 && (
        <footer>
          <Pagination {...{ pageNum, totalPages }} />
        </footer>
      )}
    </Stack>
  );
}
