import Highlight, { defaultProps, Language, Prism } from "prism-react-renderer";
import clsx from "clsx";

export * from "prism-react-renderer";

export interface PrismHighlightProps {
  code: string;
  language: string | Language;
}

export function getLanguageKeys(): string[] {
  return Object.keys(Prism.languages);
}

export default function PrismHighlight({
  code,
  language,
}: PrismHighlightProps) {
  return (
    <figure className="code-block relative block bg-yellow-300">
      <Highlight {...defaultProps} language={language as Language} code={code}>
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
                        const { tokenKey, ...tokenProps } = getTokenProps({
                          token,
                          key,
                        });
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
