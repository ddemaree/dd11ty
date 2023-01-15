import { GetStaticPathsContext, GetStaticPropsContext } from "next";
import htmlToReact from "@lib/text/htmlToReact";
import sanitizeHtml from "@lib/text/sanitizeHtml";
import extractTweetIds from "@lib/twitter/extractTweetIds";
import fetchTweets from "@lib/twitter/fetchTweets";
import { getAllPosts, getSinglePost, WordpressPost } from "@lib/wordpress";
import PostHeader from "@components/PostHeader";

import { NextSeo } from "next-seo";
import { postMeta } from "@lib/meta";

export default function BlogPostPage({
  post,
  cleanContent,
  tweets,
}: {
  post: WordpressPost;
  tweets: Tweet[];
  cleanContent: string;
}) {
  const { title, excerpt: subtitle, date, featuredImage } = post;

  const reactContent = htmlToReact(cleanContent, tweets, {
    tweets: true,
  });

  return (
    <article>
      <NextSeo {...postMeta(post)} />
      <PostHeader {...{ title, date, subtitle, image: featuredImage }} />
      <main className="mt-12 prose prose-lg prose-grid font-serif prose-figcaption:font-sans font-normal dark:text-slate-100">
        {reactContent}
      </main>
    </article>
  );
}

export async function getStaticPaths({}: GetStaticPathsContext) {
  const posts = await getAllPosts(20);

  const paths = posts.map(({ slug }) => ({
    params: {
      slug,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const { slug } = params as { slug: string };
  const { error, post } = await getSinglePost(slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  const cleanContent = await sanitizeHtml(post.content);
  const tweetIds = extractTweetIds(cleanContent);
  const tweets = await fetchTweets(tweetIds);

  return {
    props: {
      error: error ?? null,
      post,
      cleanContent,
      tweetIds,
      tweets,
    },
    revalidate: 30,
  };
}
