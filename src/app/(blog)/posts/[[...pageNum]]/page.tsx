import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isUndefined } from "lodash";

import { getAllPosts } from "@lib/wordpress";
import transformGutenberg from "@lib/wordpress/transformGutenberg";
import BlogPostIndex from "../../BlogPostIndex";
import "./posts-page.scss";

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

  await Promise.all(
    posts.map((p) =>
      transformGutenberg(p.content).then((vfile) => {
        if (vfile) p.content = vfile.toString("utf-8");
      })
    )
  );

  return (
    <BlogPostIndex posts={posts} pageNum={pageNum} totalPages={totalPages} />
  );
}
