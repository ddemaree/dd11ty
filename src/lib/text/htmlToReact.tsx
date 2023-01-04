import parse, { DOMNode, Element } from "html-react-parser";
import * as cheerio from "cheerio";
import Tweet from "@lib/twitter/Tweet";
import _ from "lodash";
import extractTweetIds from "@lib/twitter/extractTweetIds";
import shiki from "shiki";
import path from "path";

// console.log(path.join(process.cwd(), "node_modules/shiki/themes"))

const highlighter = await shiki.getHighlighter({ paths: {
  themes: path.join(process.cwd(), "node_modules/shiki/themes"),
  languages: path.join(process.cwd(), "node_modules/shiki/languages")
} });

export default async function htmlToReact(htmlString: string, tweets: any[]) {


  const reactContent = parse(htmlString, {
    replace(node: DOMNode) {
      if (!(node instanceof Element)) {
        return;
      }

      let $node: cheerio.CheerioAPI;
      try {
        $node = cheerio.load(node);
      } catch (err) {
        console.error(err);
      }

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

        // console.log(highlighter.codeToHtml(codeSrc, { lang: "markup" }));

        return <figure className="code-block">CODE</figure>;
      }
    },
  });

  return reactContent;
}
