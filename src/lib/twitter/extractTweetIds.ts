import { AnyNode, load } from "cheerio";

export default function extractTweetIds(htmlString: string | AnyNode) {
  let tweetIds: string[] = [];

  load(htmlString)("a[href*=twitter.com/]").each((idx, elem) => {
    const href = load(elem)("a").first().attr("href") as string;
    const tweetId = href
      .match(/twitter.com\/[^\/]+\/status\/(\d+)/)
      ?.at(1) as string;
    tweetIds.push(tweetId);
  });

  return tweetIds;
}
