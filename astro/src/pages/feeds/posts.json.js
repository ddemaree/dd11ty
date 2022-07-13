import { getFeed } from "../../lib/feeds";

const feed = await getFeed();

export const get = () => {
  const body = feed.json1();
  return {
    body,
  };
};
