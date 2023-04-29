/** @format */

import { remarkReadingTime } from "./remarkReadingTime.mjs";
import { rehypeNoScript } from "./rehypeNoScript.mjs";
import { rehypeTransformTweets } from "./rehypeTransformTweets/index.mjs";
import { remarkEmbeds } from "./remarkEmbed.mjs";

export const remarkPlugins = [remarkReadingTime, remarkEmbeds];

export const rehypePlugins = [rehypeNoScript, rehypeTransformTweets];
