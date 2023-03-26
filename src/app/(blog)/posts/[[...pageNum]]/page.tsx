import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { getAllPosts, WordpressPost } from "@lib/wordpress";
import DisplayDate from "@components/DisplayDate";

import "./posts-page.scss";
import FooterOrnament from "@components/FooterOrnament";
import { Header, VStack } from "@components/Layout";
import { isUndefined } from "lodash";
import Prose from "@components/Prose";
import transformGutenberg, {
  wpToReact,
} from "@lib/wordpress/transformGutenberg";
import { blogPostUrl } from "@lib/urls";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/sharp-solid-svg-icons";
import { Fragment } from "react";

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

function BlogPost({ post }: { post: WordpressPost }) {
  const content = post.content;

  const postIsVeryLong = post.wordCount > 1500;

  return (
    <article key={post.slug} className="@container/post-card">
      <Link href={`/post/${post.slug}`}>
        <h2
          className="title font-semibold text-4xl leading-[1.1]"
          dangerouslySetInnerHTML={{ __html: post.title }}
        />
      </Link>

      {!postIsVeryLong && (
        <Prose
          as="main"
          className="!prose-simplified  mt-6"
          content={content}
        />
      )}
      {postIsVeryLong && (
        <>
          <div
            className="text-xl mt-1 mb-3 leading-normal max-w-[44ch]"
            dangerouslySetInnerHTML={{ __html: post.excerpt }}
          />
          <div>
            <Link
              href={blogPostUrl(post.slug)}
              className=" text-red-500 font-semibold"
            >
              Read post <FontAwesomeIcon size="sm" icon={faChevronRight} />
            </Link>
          </div>
        </>
      )}

      <p className="publish-date dateline mt-6 font-medium">
        <DisplayDate dateString={post.date} />
        {postIsVeryLong && (
          <>
            {" • "}
            <span>{`${post.readingTime} min read`}</span>
          </>
        )}
      </p>
    </article>
  );
}

export default async function BlogIndexPage({
  params: { pageNum = "1" },
}: {
  params: { pageNum: string | number };
}) {
  pageNum = Number(pageNum);

  const { posts, totalPages } = await getAllPosts({ page: pageNum });
  if (!posts) notFound();

  await Promise.all(
    posts.map((p) =>
      transformGutenberg(p.content).then((vfile) => {
        if (vfile) p.content = vfile.toString("utf-8");
      })
    )
  );

  const previousPage = pageNum - 1 < 0 ? null : pageNum - 1;
  const nextPage = pageNum + 1 > totalPages ? null : pageNum + 1;

  return (
    <VStack className=" w-[800px]">
      <section className="flex flex-col gap-y-10 w-inset max-w-content mx-auto">
        {/* <Header>
          <h1 className="text-4xl font-semibold">
            {pageNum === 1 ? "Posts" : `Page ${pageNum}`}
          </h1>
        </Header> */}

        {posts.map((post: WordpressPost, index: number) => (
          <Fragment key={post.slug}>
            {index > 0 && <hr />}
            <BlogPost post={post} />
          </Fragment>
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
      {/* <FooterOrnament /> */}
    </VStack>
  );
}
