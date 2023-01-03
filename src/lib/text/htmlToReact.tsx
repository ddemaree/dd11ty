import parse, { DOMNode, Element } from "html-react-parser";
import * as cheerio from "cheerio";
import Tweet from "@lib/twitter/Tweet";
import _ from "lodash";
import extractTweetIds from "@lib/twitter/extractTweetIds";

function mapTypes(node: DOMNode, children: DOMNode[], indentLevel = 0) {
  console.log(
    _.repeat(" ", indentLevel),
    node.type,
    node.name,
    node.children.length
  );

  if (node.children && indentLevel <= 2) {
    mapTypes(node, indentLevel + 1);
  }
}

export default function htmlToReact(htmlString: string, tweets: any[]) {
  const reactContent = parse(htmlString, {
    replace(node: DOMNode) {
      if (!(node instanceof Element)) {
        return;
      }
      const { name, attribs, children } = node;
      if (name && name === "figure" && attribs?.class.match(/twitter/)) {
        const [tweetId] = extractTweetIds(node);

        const tweet = tweets.find((tweet) => tweet.id === tweetId);
        return <Tweet id={tweetId} tweet={tweet} key={`tweet-${tweet.id}`} />;
      }
    },
  });

  return reactContent;
}
