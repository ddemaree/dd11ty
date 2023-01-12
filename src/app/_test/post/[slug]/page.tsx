import { notFound } from "next/navigation";
import { getSinglePost } from "@lib/wordpress";
import sanitizeHtml from "@lib/text/sanitizeHtml";
import extractTweetIds from "@lib/twitter/extractTweetIds";
import fetchTweets from "@lib/twitter/fetchTweets";
import htmlToReact from "@lib/text/htmlToReact";
import PostHeader from "@components/PostHeader";

export default async function BlogPostPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const { post } = await getSinglePost(slug);

  if (!post) {
    notFound();
  }

  const cleanContent = sanitizeHtml(post.content);
  const tweetIds = extractTweetIds(cleanContent);
  const tweets = await fetchTweets(tweetIds);

  const { title, content, excerpt: subtitle, date, featuredImage } = post;

  const reactContent = htmlToReact(cleanContent, tweets, { codeBlocks: false });

  return (
    <article>
      <PostHeader {...{ title, date, subtitle, image: featuredImage }} />
      <main className="mt-12 prose prose-lg prose-grid font-serif prose-figcaption:font-sans font-normal dark:text-slate-100">
        {reactContent}
      </main>
    </article>
  );
}
