type FeedParams = {
  feedPath: undefined | string;
};

import { getFeed, getFeedFormatDefinition } from "@/lib/feeds";

export const get = async ({ params: { feedPath } }: { params: FeedParams }) => {
  let format: "rss" | "json" | "atom" = "rss";

  if (feedPath?.endsWith("json")) format = "json";
  if (feedPath?.endsWith("atom")) format = "atom";

  const feedFormatDefinition = getFeedFormatDefinition(format);
  const { contentType, method } = feedFormatDefinition;

  const feed = await getFeed();

  const response = new Response(feed[method](), {
    headers: {
      "Content-Type": contentType,
    },
  });

  return response;
};
