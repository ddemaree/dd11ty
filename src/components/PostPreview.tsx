import { WordpressPost } from "@lib/wordpress";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import DisplayDate from "./DisplayDate";
import styles from "./posts-page.module.scss";

export default function PostPreview({
  post,
  index,
}: {
  post: WordpressPost;
  index?: number;
}) {
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
