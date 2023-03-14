import type { Metadata } from "next";

import { getSinglePost, wpToReact, WordpressPost } from "@lib/wordpress";

import PostHeader from "./PostHeader";

type SinglePostPageProps = {
  params: { slug: string };
};

export async function generateMetadata({
  params: { slug },
}: SinglePostPageProps): Promise<Metadata> {
  const post = await getSinglePost(slug);

  if (post) {
    const { title } = post;

    return {
      title,
    };
  }
}

export default async function BlogPostPage({
  params: { slug },
}: SinglePostPageProps) {
  const post = await getSinglePost(slug);

  const {
    title,
    content: _content,
    excerpt: subtitle,
    date,
    featuredImage,
  } = post as WordpressPost;

  const Content = await wpToReact(_content);

  return (
    <article>
      <PostHeader {...{ title, date, subtitle, image: featuredImage }} />
      <main className="mt-12 prose prose-lg prose-grid font-serif prose-figcaption:font-sans font-normal dark:text-slate-100">
        <Content />
      </main>
    </article>
  );
}
