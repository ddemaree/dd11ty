import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { getAllPosts, WordpressPost } from "@lib/wordpress";
import DisplayDate from "@components/DisplayDate";

import "./posts-page.scss";
import FooterOrnament from "@components/FooterOrnament";
import { Header, VStack } from "@components/Layout";
import { imageUrl } from "@lib/urls";
import { isUndefined } from "lodash";

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
  let title: string = "Blog posts";

  if (!isUndefined(pageNum)) {
    title = `Blog posts - Page ${pageNum}`;
  }

  return {
    title,
    description:
      "Notes from the desk of David Demaree. Writing about tech, business, digital culture, and whatever else crosses my mind.",
    openGraph: {
      images: {
        url: `/api/og-image`,
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
    <VStack>
      <section className="flex flex-col gap-y-10 w-inset max-w-content mx-auto">
        <Header>
          <h1 className="text-4xl font-semibold">
            {pageNum === 1 ? "Posts" : `Page ${pageNum}`}
          </h1>
        </Header>
        {posts.map((post: WordpressPost) => (
          <article key={post.slug} className="@container/post-card">
            <Link href={`/post/${post.slug}`}>
              <h1
                className="title font-semibold text-2xl"
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
      <FooterOrnament />
    </VStack>
  );
}
