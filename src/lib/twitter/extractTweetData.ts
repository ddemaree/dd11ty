/** @format */

import unicodeSubstring from "./unicodeSubstring";
import { keyBy } from "lodash";

export default function extractTweetData(jsonData: any) {
  const { data, includes } = jsonData;

  if (!data) {
    return [];
  }

  const mediaData = keyBy(includes?.media, "media_key") as any;
  const usersData = keyBy(includes?.users, "id") as any;
  const tweetsData = keyBy(includes?.tweets, "id");

  const processTweet = (tweet: any, quoteLevel = 0) => {
    let { text, entities } = tweet;

    const urls = entities?.urls ?? [];
    const annotations = entities?.annotations ?? [];
    const mentions = entities?.mentions ?? [];

    let allAnnotations = [...annotations, ...urls, ...mentions].sort(
      (a, b) => a.start - b.start
    );

    const tweetLength = text.length;
    let lastEnd = 0;
    let parts: TwitterPart[] = [];

    allAnnotations.forEach((obj) => {
      const { start, end } = obj;
      let outputObj;

      if (!obj.username && !obj.url) {
        return;
      }

      let before = unicodeSubstring(text, lastEnd, start);
      if (before) parts.push(before);

      if (obj.url) obj._url = obj.url;

      if (obj.url && obj.media_key) {
        outputObj = {
          ...obj,
          ...mediaData[obj.media_key],
        };
      } else if (obj.expanded_url && obj.title) {
        outputObj = {
          type: "website",
          url: obj.expanded_url,
          display_url: obj.display_url,
          images: obj.images || [],
          title: obj.title,
          description: obj.description,
        } as TwitterWebsite;
      } else if (obj.username && obj.id) {
        outputObj = {
          username: obj.username,
          id: obj.id,
          profile_image_url: obj.profile_image_url || null,
        };
      } else if (
        obj.expanded_url &&
        obj.expanded_url.match(/https?:\/\/twitter\.com/)
      ) {
        // Quoted tweet
        const quotedId = obj.expanded_url.match(/\/(\d+)$/).at(1);
        const quotedTweet = processTweet(tweetsData[quotedId], quoteLevel + 1);
        outputObj = quotedTweet;
      } else {
        console.log({
          start,
          end,
          tweetLength,
          obj,
          substring: unicodeSubstring(text, start, end),
        });
        outputObj = obj;
      }

      parts.push(outputObj);
      lastEnd = end;
    });

    // Get rest of the text if any
    if (lastEnd < text.length) {
      parts.push(unicodeSubstring(text, lastEnd));
    }

    tweet.author = usersData[tweet.author_id];
    tweet.parts = parts;

    return tweet;
  };

  const outputTweets = data.map(processTweet) as Tweet[];

  return outputTweets;
}
