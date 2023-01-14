import * as cheerio from "cheerio";

// import clsx from "clsx";
// import Highlight, { defaultProps, Language } from "prism-react-renderer";

import _ from "lodash";
import parse, { DOMNode, Element, domToReact } from "html-react-parser";
import Tweet from "@lib/twitter/Tweet";
import extractTweetIds from "@lib/twitter/extractTweetIds";
import { PrismHighlightProps } from "@components/PrismHighlight";

function getDropCapTexts(initialText: string) {
  const words = initialText?.split(" ");
  const firstWord = words?.slice(0, 1)[0] as string;
  const remainingWords = words?.slice(1).join(" ") as string;

  const letters = firstWord?.split("") as string[];
  const firstLetter = letters?.slice(0, 1)[0];
  const restOfFirstWord = letters?.slice(1).join("");

  return {
    words,
    firstWord,
    remainingWords,
    letters,
    firstLetter,
    restOfFirstWord,
  };
}

function DropCapFragment({ text: initialText }: { text: string }) {
  const { firstLetter, firstWord, restOfFirstWord, remainingWords } =
    getDropCapTexts(initialText);
  return (
    <>
      <span className="drop-cap">
        <span aria-hidden="true">
          <span className="initial">{firstLetter}</span>
          <span>{restOfFirstWord}</span>
        </span>
        <span className="sr-only">{firstWord}</span>
      </span>{" "}
      {remainingWords}
    </>
  );
}

interface HtmlToReactOptions {
  codeBlocks: boolean;
  tweets: boolean;
  components?: {
    Code?: (props: PrismHighlightProps) => JSX.Element;
  };
}

const DEFAULT_OPTIONS: HtmlToReactOptions = {
  codeBlocks: true,
  tweets: true,
  components: {},
};

/*

This function converts vanilla HTML (especially that provided by WordPress) to React components, substituting certain block formats like Tweets or code blocks into fancy React equivalents.

In addition to enabling React blocks, this is also the de facto browser formatter for rich content — stuff like drop caps, which shouldn't be provided to RSS feeds, are implemented here.

*/
export default function htmlToReact(
  htmlString: string,
  tweets: any[],
  options: HtmlToReactOptions = DEFAULT_OPTIONS
) {
  let paragraphCount = -1;

  // Merge in default options
  options = _.merge({}, DEFAULT_OPTIONS, options);

  const reactContent = parse(htmlString, {
    replace(node: DOMNode) {
      if (!(node instanceof Element)) return;

      const { name, attribs, children } = node;

      // Drop caps: Find the first text node within the first paragraph element in the doc. This is usually the first child node, but may be inside a link or other phrase element
      if (name === "p") {
        paragraphCount++;
        if (
          paragraphCount === 0 &&
          node.childNodes[0]?.type === "text" &&
          !node.previousSibling
        ) {
          // TODO: What if the first element is not a text node?
          const [initialTextNode, ...otherChildNodes] = node.childNodes;
          const initialText = initialTextNode.data;
          const remainingElements = domToReact(otherChildNodes);

          return (
            <p className="has-drop-cap">
              <DropCapFragment text={initialText} />
              {remainingElements}
            </p>
          );
        }
      }

      if (options.tweets) {
        if (name && name === "figure" && attribs?.class?.match(/twitter/)) {
          const [tweetId] = extractTweetIds(node);

          const tweet = tweets.find((tweet) => tweet.id === tweetId);
          if (tweet) {
            return (
              <Tweet id={tweetId} tweet={tweet} key={`tweet-${tweet.id}`} />
            );
          } else {
            console.log(`Could not find tweet with id ${tweetId}`);
          }
        }
      }

      if (options.codeBlocks && options?.components?.Code) {
        const { Code } = options.components;

        // Should cover all top level code blocks with a language-* class
        // (We can't do much with un-tagged code blocks)
        const classMatch = attribs?.class?.match(/language-([a-z]+)/);
        if (name && name === "pre" && classMatch) {
          const codeNode = cheerio.load(node)("code");
          const codeSrc = codeNode.text().trim();

          // Get the language
          let languageName = classMatch.at(1);
          const { Code } = options?.components;

          return <Code code={codeSrc} language={languageName} />;
        }
      }
    },
  });

  return reactContent;
}
