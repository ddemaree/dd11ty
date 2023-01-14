import PostHeader from "@components/PostHeader";
import htmlToReact from "@lib/text/htmlToReact";
import sanitizeHtml from "@lib/text/sanitizeHtml";
import extractTweetIds from "@lib/twitter/extractTweetIds";
import { getSinglePost } from "@lib/wordpress";
import { notFound } from "next/navigation";

import fetchTweets from "@lib/twitter/fetchTweets";

import { NewPrismHighlight } from "./NewPrismHighlight";

import shiki from "shiki";

export default async function BlogPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params as { slug: string };
  const { post } = await getSinglePost(slug);

  if (!post) notFound();

  const cleanContent = sanitizeHtml(post.content);
  const tweetIds = extractTweetIds(cleanContent);
  // const tweets = await fetchTweets(tweetIds);
  const tweets: Tweet[] = [];

  const { title, excerpt: subtitle, date, featuredImage } = post;

  const reactContent = htmlToReact(cleanContent, tweets, {
    codeBlocks: true,
    tweets: false,
    components: {
      Code: NewPrismHighlight,
    },
  });

  // const highlighter = await shiki.getHighlighter({ theme: "nord" });
  // const source = highlighter.codeToThemedTokens(`<h1>Hello</h1>`, "html");
  // console.log(source);

  return (
    <article>
      <PostHeader {...{ title, date, subtitle, image: featuredImage }} />
      <main className="mt-12 prose prose-lg prose-grid font-serif prose-figcaption:font-sans font-normal dark:text-slate-100">
        {reactContent}
      </main>
    </article>
  );
}
