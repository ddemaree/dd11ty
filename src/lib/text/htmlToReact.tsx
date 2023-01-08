import parse, {
  DOMNode,
  Element,
  domToReact,
  htmlToDOM,
} from "html-react-parser";
import * as cheerio from "cheerio";
import Tweet from "@lib/twitter/Tweet";
import _ from "lodash";
import extractTweetIds from "@lib/twitter/extractTweetIds";

import Highlight, { defaultProps, Language } from "prism-react-renderer";
import clsx from "clsx";

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

/*

This function converts vanilla HTML (especially that provided by WordPress) to React components, substituting certain block formats like Tweets or code blocks into fancy React equivalents.

In addition to enabling React blocks, this is also the de facto browser formatter for rich content — stuff like drop caps, which shouldn't be provided to RSS feeds, are implemented here.

*/
export default function htmlToReact(htmlString: string, tweets: any[]) {
  let paragraphCount = 0;

  const reactContent = parse(htmlString, {
    replace(node: DOMNode) {
      if (!(node instanceof Element)) return;

      const { name, attribs, children } = node;

      // Drop caps: Find the first text node within the first paragraph element in the doc. This is usually the first child node, but may be inside a link or other phrase element
      if (name === "p") {
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
        paragraphCount++;
      }

      if (name && name === "figure" && attribs?.class.match(/twitter/)) {
        const [tweetId] = extractTweetIds(node);

        const tweet = tweets.find((tweet) => tweet.id === tweetId);
        return <Tweet id={tweetId} tweet={tweet} key={`tweet-${tweet.id}`} />;
      }

      // Should cover all top level code blocks with a language-* class
      // (We can't do much with un-tagged code blocks)
      const classMatch = attribs?.class?.match(/language-([a-z]+)/);
      if (name && name === "pre" && classMatch) {
        const codeNode = cheerio.load(node)("code");
        const codeSrc = codeNode.text().trim();

        // Get the language
        let languageName = classMatch.at(1) as Language;

        return (
          <figure className="code-block relative block bg-yellow-300">
            <Highlight {...defaultProps} language={languageName} code={codeSrc}>
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre
                  className={clsx(
                    className,
                    "m-0 p-4 rounded-lg w-full max-w-full overflow-hidden"
                  )}
                  style={style}
                >
                  <code className="font-mono [font-size:0.875em] space-y-0">
                    {tokens.map((line, i) => {
                      const { key, ...lineProps } = getLineProps({
                        line,
                        key: i,
                      });

                      return (
                        <div key={key} {...lineProps}>
                          <span>
                            {line.map((token, key) => {
                              const { tokenKey, ...tokenProps } = getTokenProps(
                                { token, key }
                              );
                              return <span key={tokenKey} {...tokenProps} />;
                            })}
                          </span>
                        </div>
                      );
                    })}
                  </code>
                </pre>
              )}
            </Highlight>
          </figure>
        );
      }
    },
  });

  return reactContent;
}
