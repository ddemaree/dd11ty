import parse, { DOMNode, Element, domToReact, htmlToDOM } from "html-react-parser";
import * as cheerio from "cheerio";
import Tweet from "@lib/twitter/Tweet";
import _ from "lodash";
import extractTweetIds from "@lib/twitter/extractTweetIds";

export default function htmlToReact(htmlString: string, tweets: any[]) {
  const reactContent = parse(htmlString, {
    replace(node: DOMNode) {
      if (!(node instanceof Element)) return;

      const { name, attribs, children } = node;
      if (name && name === "figure" && attribs?.class.match(/twitter/)) {
        const [tweetId] = extractTweetIds(node);

        const tweet = tweets.find((tweet) => tweet.id === tweetId);
        return <Tweet id={tweetId} tweet={tweet} key={`tweet-${tweet.id}`} />;
      }

      // Should cover all top level code blocks
      if (name && name === "pre") {
        const codeNode = $node("code");
        const codeSrc = codeNode.text().trim();

        return <figure className="code-block">CODE</figure>;
      }
    },
  });

  // const reactContent = parse(htmlString);

  return reactContent;
}
