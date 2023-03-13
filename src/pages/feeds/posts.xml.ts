import type { APIContext } from "astro";
import { getFeed } from "@lib/feeds";

export const get = async (context: APIContext) => {
  const feed = await getFeed();
  const body = feed.rss2();
  return {
    body,
  };
};
