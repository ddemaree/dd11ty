import type { Metadata } from "next";

import { getSinglePost, WordpressPost } from "@lib/wordpress";
import { wpToReact } from "@lib/wordpress/transformGutenberg";

import PostHeader from "./PostHeader";

import "./tweets.css";
import { decode } from "html-entities";

type SinglePostPageProps = {
  params: { slug: string };
};

export async function generateMetadata({
  params: { slug },
}: SinglePostPageProps): Promise<Metadata> {
  const post = await getSinglePost(slug);
  if (!post) throw new Error("POOP");

  const { title } = post;

  return {
    title: decode(title),
  };
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
      <main className="mt-12 prose prose-lg prose-grid font-serif prose-figcaption:font-sans prose-figcaption:text-stone-500 dark:prose-figcaption:text-stone-400 prose-a:text-red-500 dark:prose-a:text-red-500 prose-strong:text-black dark:prose-strong:text-white prose-headings:text-black dark:prose-headings:text-white tweets-handle:text-slate-400 dark:tweets-handle:text-slate-400 tweets-name:text-slate-900 dark:tweets-name:text-slate-100 tweets-name:m-0 tweets:bg-slate-200 dark:tweets:bg-slate-800  tweets-footer:mt-4 tweets-footer:text-sm tweets-date:text-slate-400 tweets-date:no-underline dark:tweets-content:text-slate-200 tweets-content:text-slate-700">
        <Content />
      </main>
    </article>
  );
}
