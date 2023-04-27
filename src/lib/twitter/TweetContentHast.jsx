/** @jsx h @jsxFrag null */

import { h } from "hastscript";
import { uniqueId } from "lodash";

export function hastTweetContent(parts = [], quoteLevel = 0) {
  const keyPrefix = uniqueId();

  parts.map((part, idx) => {
    const key = `${keyPrefix}-${idx}`;

    if (typeof part === "string") {
      const substrings = part.split(/\n/);
      if (substrings.length === 1) return part;

      const fragment = substrings.reduce((output, substr, idx) => {
        if (idx > 0) output.push(h("br"));
        if (substr) output.push(substr);
        return output;
      }, []);
    }
  });
}

export default function TweetContentHast({ parts = [], quoteLevel = 0 }) {
  const keyPrefix = uniqueId();

  const out = (
    <div>
      <h1>I am a tweet</h1>
    </div>
  );

  console.log(out);

  return out;
}
