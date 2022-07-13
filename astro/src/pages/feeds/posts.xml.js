import { getFeed } from "../../lib/feeds";

const feed = await getFeed();

export const get = () => {
  const body = feed.rss2();
  return {
    body,
  };
};
