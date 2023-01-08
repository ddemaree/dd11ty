import DisplayDate from "@components/DisplayDate";
import paginate from "@lib/paginate";
import { getAllPosts, WordpressPost } from "@lib/wordpress";
import clsx from "clsx";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import DescriptionTags, {
  seoDescriptionTags,
} from "@components/head/Description";
import { seoTitleTags } from "@components/head/Title";

import styles from "./posts-page.module.scss";
import Image from "next/image";

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

  return {
    props: { allPosts, pageNum },
  };
}

function PostPreview({ post, index }: { post: WordpressPost; index?: number }) {
  console.log(post.featuredImage);

  return (
    <article key={post.slug} className="@container/post-card">
      <div className="grid grid-cols-1 gap-x-8 grid-flow-row @md/post-card:grid-cols-[1fr_25cqi] items-center desc:col-span-1 desc:col-start-1">
        <div>
          <Link href={`/post/${post.slug}`} className={styles.title}>
            <h1
              className={clsx([
                styles.postTitle,
                "title font-bold [font-size:min(1.875rem,_15cqi)] @lg:[font-size:2.5rem] [font-variation-settings:'wdth'_120] tracking-[-0.03ch] leading-[1.025]",
              ])}
            >
              {post.title}
            </h1>
          </Link>
          {post.excerpt && (
            <p className="description mt-[0.375em] @lg:[font-size:1.125rem] leading-snug max-w-prose text-gray-400">
              {post.excerpt}
            </p>
          )}
          <p className="publish-date dateline mt-[0.75em]">
            <DisplayDate dateString={post.date} />
          </p>
        </div>
        {post.featuredImage && (
          <figure className="w-full order-first @md:order-last @md:w-[clamp(180px,25cqi,216px)] @md/post-card:col-start-2 @md/post-card:row-start-1 @md/post-card:row-span-full">
            <a href={`/post/${post.slug}`}>
              <Image
                alt="Image for post"
                src={post.featuredImage.sourceUrl}
                width={400}
                height={400}
                className="bg-gray-400 w-full aspect-video @md:aspect-square @2xl:aspect-[5/4] object-cover object-top rounded-lg border border-gray-300 shadow"
              />
            </a>
          </figure>
        )}
      </div>
    </article>
  );
}

export default function BlogIndexPage({
  allPosts,
  pageNum,
}: {
  allPosts: WordpressPost[];
  pageNum: number;
}) {
  const {
    current: currentPage,
    nextPage,
    previousPage,
  } = paginate(allPosts, pageNum);

  const titleComponents = ["David Demaree's blog"];

  if (pageNum > 1) titleComponents.push(`Page ${pageNum}`);

  const titleString = titleComponents.join(" • ");

  return (
    <section className="flex flex-col gap-y-10 w-inset max-w-[50rem] mx-auto space-y-8">
      {/* <Helmet title={titleString}>
        {seoTitleTags(titleString)}
        {seoDescriptionTags("Notes on tech, business, and culture")}
      </Helmet> */}
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
