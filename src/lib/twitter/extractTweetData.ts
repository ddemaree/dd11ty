import { isArray, keyBy } from "lodash";
import unicodeSubstring from "unicode-substring";

export default function extractTweetData(jsonData) {
  const {
    data,
    includes,
  }: {
    data: any[];
    includes: { media: any[]; users: any[]; tweets: any[] };
  } = jsonData;

  const mediaData = keyBy(includes?.media, "media_key") as any;
  const usersData = keyBy(includes?.users, "id") as any;
  const tweetsData = keyBy(includes?.tweets, "id");

  console.log(mediaData);

  const outputTweets = data.map((tweet) => {
    let {
      text,
      entities,
    }: {
      text: string;
      entities: { urls?: any[]; annotations?: any[]; mentions?: any[] };
    } = tweet;

    const urls = entities?.urls ?? [];
    const annotations = entities?.annotations ?? [];
    const mentions = entities?.mentions ?? [];

    let allAnnotations = [...annotations, ...urls, ...mentions].sort(
      (a, b) => a.start - b.start
    );

    const tweetLength = text.length;
    let lastEnd = 0;
    let parts: TwitterPart[] = [];

    allAnnotations.forEach(({ start, end, ...obj }) => {
      let outputObj;

      if (!obj.username && !obj.url) {
        return;
      }

      let before = unicodeSubstring(text, lastEnd, start);
      if (before) parts.push(before);

      if (obj.url && obj.media_key) {
        outputObj = {
          ...obj,
          ...mediaData[obj.media_key],
          original_url: obj.url,
        };
      } else if (obj.expanded_url && obj.title) {
        outputObj = {
          type: "website",
          url: obj.expanded_url,
          display_url: obj.display_url,
          images: obj.images,
          title: obj.title,
          description: obj.description,
        } as TwitterWebsite;
      } else if (obj.username && obj.id) {
        outputObj = {
          username: obj.username,
          id: obj.id,
          profile_image_url: obj.profile_image_url,
        };
      } else if (obj.expanded_url && obj.expanded_url.match(/twitter\.com/)) {
        // Quoted tweet
        console.log(tweetsData);

        outputObj = obj;
      } else {
        console.log(entities);
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
  });

  return outputTweets;
}
