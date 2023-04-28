import { getFeed, getFeedObj } from "@lib/feeds";
import { blogPostUrl } from "@lib/urls";
import { getAllPosts } from "@lib/wordpress";

export async function GET(request: Request) {
  const { posts } = await getAllPosts();
  if (!posts || posts.length === 0) throw new Error("No posts in response");

  const feed = getFeedObj();

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: blogPostUrl(post.slug, true),
      link: blogPostUrl(post.slug, true),
      description: post.excerpt,
      date: new Date(post.date),
    });
  });

  // const feed = await getFeed();
  const body = feed.rss2();
  return new Response(body);
}
