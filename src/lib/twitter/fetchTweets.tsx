import { isArray } from "lodash";
import extractTweetData from "./extractTweetData";

const fetchTweets = async (tweetIds: string | string[] = []) => {
  if (tweetIds.length === 0) return [];
  if (!isArray(tweetIds)) tweetIds = [tweetIds];

  const options =
    "&expansions=author_id,attachments.media_keys,referenced_tweets.id,referenced_tweets.id.author_id&tweet.fields=public_metrics,created_at,entities&user.fields=profile_image_url&media.fields=url,type,width,height";

  return fetch(
    `https://api.twitter.com/2/tweets/?ids=${tweetIds.join(",")}${options}`,
    { headers: { Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}` } }
  )
    .then((res) => res.json())
    .then((jsonData) => extractTweetData(jsonData));
};

export default fetchTweets;
