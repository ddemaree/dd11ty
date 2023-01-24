// import { AnyNode, load } from "cheerio";

// export default function extractTweetIds(htmlString: string | AnyNode) {
//   let tweetIds: string[] = [];

//   load(htmlString)("a[href*=twitter.com/]").each((idx, elem) => {
//     const href = load(elem)("a").first().attr("href") as string;
//     const tweetMatch = href.match(/twitter.com\/[^\/]+\/status\/(\d+)/);
//     const tweetId = tweetMatch?.at(1) as string;
//     if (tweetId) tweetIds.push(tweetId);
//   });

//   return tweetIds;
// }
