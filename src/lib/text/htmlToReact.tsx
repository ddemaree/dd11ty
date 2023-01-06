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
                    {tokens.map((line, i) => (
                      <div key={i} {...getLineProps({ line, key: i })}>
                        {/* <LineNo>{i + 1}</LineNo> */}
                        <span>
                          {line.map((token, key) => (
                            <span
                              key={key}
                              {...getTokenProps({ token, key })}
                            />
                          ))}
                        </span>
                      </div>
                    ))}
                  </code>
                </pre>
              )}
            </Highlight>
          </figure>
        );
      }
    },
  });

  // const reactContent = parse(htmlString);

  return reactContent;
}
