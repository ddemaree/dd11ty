import type { Metadata } from "next";

import { getAllPosts, getSinglePost, WordpressPost } from "@lib/wordpress";
import { wpToReact } from "@lib/wordpress/transformGutenberg";

import { decode } from "html-entities";
import { blogPostUrl } from "@lib/urls";

import { VStack } from "@components/Layout";
import PostHeader from "@components/PostHeader";
import FooterOrnament from "@components/FooterOrnament";
import { notFound } from "next/navigation";

type SinglePostPageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const { posts } = await getAllPosts();
  if (!posts) throw new Error("No posts returned");

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params: { slug },
}: SinglePostPageProps): Promise<Metadata> {
  const post = await getSinglePost(slug);
  if (!post) notFound();

  const { title } = post;

  return {
    title: decode(title),
    description: decode(post.excerpt),
    openGraph: {
      title: decode(title),
      description: decode(post.excerpt),
      authors: ["David Demaree"],
      type: "article",
      publishedTime: post.date,
    },
    alternates: {
      canonical: blogPostUrl(slug, true),
    },
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
    <VStack as="article">
      <PostHeader {...{ title, date, subtitle, image: featuredImage }} />
      <main className="prose">
        <Content />
      </main>
      <FooterOrnament />
    </VStack>
  );
}
