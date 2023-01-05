import { add } from "cheerio/lib/api/traversing";
import { isArray, compact, flattenDeep, pullAll, isEmpty } from "lodash";
import extractTweetData from "./extractTweetData";

function getTwApiUrl(ids) {
  const options =
    "&expansions=author_id,attachments.media_keys,referenced_tweets.id,referenced_tweets.id.author_id&tweet.fields=public_metrics,created_at,entities&user.fields=profile_image_url&media.fields=url,type,width,height,duration_ms,preview_image_url,variants";

  return `https://api.twitter.com/2/tweets/?ids=${ids.join(",")}${options}`;
}

async function _doFetchTweets(tweetIds: string[] = []) {
  if (tweetIds.length === 0) return [];
  if (!isArray(tweetIds)) tweetIds = [tweetIds];

  return fetch(getTwApiUrl(tweetIds), {
    headers: { Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}` },
  }).then((res) => res.json());
}

const fetchTweets = async (tweetIds: string | string[] = []) => {
  return _doFetchTweets(tweetIds)
    .then((jsonData) => {
      // Get any other referenced tweets

      const addlTweetIds = pullAll(
        flattenDeep(
          compact(
            jsonData.data.map((tw) => tw.referenced_tweets?.map((t) => t.id))
          )
        ),
        tweetIds
      );

      if (isEmpty(addlTweetIds)) {
        return jsonData;
      }

      return _doFetchTweets(addlTweetIds).then((addlJsonData) => {
        if (!isEmpty(addlJsonData)) {
          jsonData.data = [...jsonData.data, ...addlJsonData.data];
          jsonData.includes = {
            media: [
              ...(jsonData.includes.media ?? []),
              ...(addlJsonData.includes.media ?? []),
            ],
            tweets: [
              ...(jsonData.includes.tweets ?? []),
              ...(addlJsonData.includes.tweets ?? []),
            ],
            users: [
              ...(jsonData.includes.users ?? []),
              ...(addlJsonData.includes.users ?? []),
            ],
          };
        }

        return jsonData;
      });
    })
    .then((jsonData) => extractTweetData(jsonData));
};

export default fetchTweets;
