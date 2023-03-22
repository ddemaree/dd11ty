import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { getAllPosts, WordpressPost } from "@lib/wordpress";
import DisplayDate from "@components/DisplayDate";

import "./posts-page.scss";

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

type BlogIndexPageProps = {
  params: { pageNum: string | number };
};

export function generateMetadata({
  params: { pageNum },
}: BlogIndexPageProps): Metadata {
  return {
    title: pageNum === 1 ? "Posts" : `Page ${pageNum}`,
    description:
      "Notes from the desk of David Demaree. Writing about tech, business, digital culture, and whatever else crosses my mind.",
    openGraph: {
      images: {
        url: `http://localhost:3000/api/og-image`,
      },
    },
  };
}

export default async function BlogIndexPage({
  params: { pageNum = "1" },
}: {
  params: { pageNum: string | number };
}) {
  pageNum = Number(pageNum);

  const { posts, totalPages } = await getAllPosts({ page: pageNum });
  if (!posts) notFound();

  const previousPage = pageNum - 1 < 0 ? null : pageNum - 1;
  const nextPage = pageNum + 1 > totalPages ? null : pageNum + 1;

  return (
    <section className="flex flex-col gap-y-10 w-inset max-w-[50rem] mx-auto space-y-8">
      <header className=" text-purple-500 h-[26vh] flex flex-col items-center justify-center">
        <h1 className=" leading-none font-light [font-size:3.5rem] [font-variation-settings:'wdth'_140]">
          {pageNum === 1 ? "Posts" : `Page ${pageNum}`}
        </h1>
      </header>
      {posts.map((post: WordpressPost) => (
        <article key={post.slug} className="@container/post-card">
          <div className="grid grid-cols-1 gap-x-8 grid-flow-row @md/post-card:grid-cols-[1fr_25cqi] items-center desc:col-span-1 desc:col-start-1">
            <div>
              <Link href={`/post/${post.slug}`}>
                <h1
                  className="title font-semibold [font-size:min(1.875rem,_15cqi)] @lg:[font-size:2.5rem] leading-[1.025]"
                  dangerouslySetInnerHTML={{ __html: post.title }}
                />
              </Link>
              {post.excerpt && (
                <div
                  className="description mt-[0.375em] @lg:[font-size:1.125rem] leading-snug max-w-prose text-gray-400"
                  dangerouslySetInnerHTML={{ __html: post.excerpt }}
                />
              )}
              <p className="publish-date dateline mt-[0.75em]">
                <DisplayDate dateString={post.date} />
              </p>
            </div>
            {post.featuredImage && (
              <figure className="w-full order-first @md:order-last @md:w-[clamp(180px,25cqi,216px)] @md/post-card:col-start-2 @md/post-card:row-start-1 @md/post-card:row-span-full">
                <a href={`/post/${post.slug}`}>
                  <img
                    src={post.featuredImage.sourceUrl}
                    className="bg-gray-400 w-full aspect-video @md:aspect-square @2xl:aspect-[5/4] object-cover object-top rounded-lg border border-gray-300 shadow"
                  />
                </a>
              </figure>
            )}
          </div>
        </article>
      ))}
      <footer>
        <div className="pagination flex flex-wrap justify-between @md:justify-center gap-4 py-12 [font-size:1.5rem] font-semibold">
          {previousPage ? (
            <Link
              href={pageUrl(previousPage)}
              className={paginationClasses("previous")}
            >
              &larr; Newer
            </Link>
          ) : (
            <span className="placeholder"></span>
          )}
          {nextPage ? (
            <Link
              href={pageUrl(nextPage)}
              className={paginationClasses("next")}
            >
              Older &rarr;
            </Link>
          ) : (
            <span className="placeholder"></span>
          )}
        </div>
      </footer>
    </section>
  );
}
