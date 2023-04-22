import { remarkReadingTime } from "./remarkReadingTime.mjs";
import { rehypeNoScript } from "./rehypeNoScript.mjs";
import { rehypeTransformTweets } from "./rehypeTransformTweets/index.mjs";

export const remarkPlugins = [
  remarkReadingTime,
];

export const rehypePlugins = [
  rehypeNoScript,
  rehypeTransformTweets,
];