import type { APIContext } from "astro";
import { getFeed } from "@lib/feeds";

const feed = await getFeed();

export const get = (context: APIContext) => {
  const body = feed.rss2();
  return {
    body,
  };
};
