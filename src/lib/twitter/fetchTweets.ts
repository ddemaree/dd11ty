import { isArray, compact, flattenDeep, pullAll, isEmpty, union } from "lodash";
import extractTweetData from "./extractTweetData";
import { Client as TwitterClient } from "twitter-api-sdk";

let _twitterClient: TwitterClient;

function getClient() {
  if (!_twitterClient) {
    _twitterClient = new TwitterClient(
      process.env.TWITTER_BEARER_TOKEN as string
    );
  }
  return _twitterClient;
}

async function _doFetchTweets(tweetIds: string[] = []) {
  if (!isArray(tweetIds)) tweetIds = [tweetIds];

  const client = getClient();
  const response = await client.tweets.findTweetsById({
    ids: tweetIds,
    expansions: [
      "author_id",
      "attachments.media_keys",
      "referenced_tweets.id",
      "referenced_tweets.id.author_id",
    ],
    "tweet.fields": ["public_metrics", "created_at", "entities"],
    "user.fields": ["profile_image_url"],
    "media.fields": [
      "url",
      "type",
      "width",
      "height",
      "duration_ms",
      "preview_image_url",
      "variants",
    ],
  });

  return response;
}

export default async function fetchTweets(tweetIds: string | string[] = []) {
  // If there were no tweet IDs just bail out
  if (tweetIds.length === 0) {
    return {
      data: [],
      includes: {},
    };
  }

  tweetIds = Array.from(tweetIds);

  const jsonData = await _doFetchTweets(tweetIds as string[]);
  var { data, includes } = jsonData;

  // Get any other referenced tweets
  // var { data } = jsonData; as { data: any[] };

  const addlTweetIds = pullAll(
    flattenDeep(
      compact(data!.map((tw) => tw.referenced_tweets?.map((t) => t.id)))
    ),
    tweetIds
  ) as string[];

  if (isEmpty(addlTweetIds)) {
    return jsonData;
  }

  const addlJsonData = await _doFetchTweets(addlTweetIds);
  const { data: addlData, includes: addlIncludes } = addlJsonData;

  if (!isEmpty(addlJsonData) && !isEmpty(addlData)) {
    data = union(data, addlData);

    includes = {
      media: union(includes?.media, addlIncludes?.media),
      tweets: union(includes?.tweets, addlIncludes?.tweets),
      users: union(includes?.users, addlIncludes?.users),
    };
  }

  return {
    data,
    includes,
  };
}
