import DisplayDate from "@components/DisplayDate";
import { VStack } from "@components/Layout";
import Prose from "@components/Prose";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/sharp-solid-svg-icons";
import { blogPostUrl } from "@lib/urls";
import { WordpressPost } from "@lib/wordpress";
import clsx from "clsx";
import Link from "next/link";

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
        <Prose as="main" className="!prose-simplified mt-6" content={content} />
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
        <Link href={pageUrl(nextPage)} className={paginationClasses("next")}>
          Older &rarr;
        </Link>
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
    <VStack className="max-w-content">
      <section className="flex flex-col gap-y-10 w-inset max-w-content mx-auto">
        {posts.map((post) => (
          <BlogPost key={post.slug} post={post} />
        ))}
      </section>
      {totalPages > 1 && (
        <footer>
          <Pagination {...{ pageNum, totalPages }} />
        </footer>
      )}
    </VStack>
  );
}
