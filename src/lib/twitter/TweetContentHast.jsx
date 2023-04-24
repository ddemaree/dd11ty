/** @jsxImportSource hastscript */

// import { h } from "hastscript";
import { uniqueId } from "lodash";

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
