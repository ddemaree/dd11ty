import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import clsx from "clsx";
import PostPreview from "@components/PostPreview";

import paginate from "@lib/paginate";
import { getAllPosts, WordpressPost } from "@lib/wordpress";

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

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  const pageNum = Number(params?.pageNum || 1);
  const allPosts = await getAllPosts();

  const {
    current: currentPage,
    nextPage,
    previousPage,
  } = paginate(allPosts, pageNum);

  return {
    props: { currentPage, pageNum, nextPage, previousPage },
  };
}

export default function BlogIndexPage({
  currentPage,
  pageNum,
  nextPage,
  previousPage,
}: {
  currentPage: WordpressPost[];
  pageNum: number;
  nextPage: number;
  previousPage: number;
}) {
  const titleComponents = ["David Demaree's blog"];

  if (pageNum > 1) titleComponents.push(`Page ${pageNum}`);

  return (
    <section className="flex flex-col gap-y-10 w-inset max-w-[50rem] mx-auto space-y-8">
      <header className=" text-purple-500 h-[26vh] flex flex-col items-center justify-center">
        <h1 className=" leading-none font-light [font-size:3.5rem] [font-variation-settings:'wdth'_140]">
          {pageNum === 1 ? "Posts" : `Page ${pageNum}`}
        </h1>
      </header>
      {currentPage.map((post: WordpressPost, idx: number) => (
        <PostPreview post={post} key={idx} />
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
