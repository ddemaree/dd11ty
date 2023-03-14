import { getFeed } from "@lib/feeds";

export async function GET(request: Request) {
  const feed = await getFeed();
  const body = feed.rss2();
  return new Response(body);
}
