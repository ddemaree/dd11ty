import Tweet from "./Tweet";

export default function TweetContent({ parts = [], quoteLevel = 0 }) {
  return (
    <div className=" leading-snug">
      {parts.map((part: TwitterPart) => {
        if (typeof part === "string") {
          // TODO: Handle line breaks

          const substrings = (part as string).split(/\n/);

          if (substrings.length === 1) return part;

          const fragment = (
            <>
              {substrings.reduce(
                (output: any[], substr: string, idx: number) => {
                  if (idx > 0) output.push(<br />);

                  if (substr) output.push(substr);

                  return output;
                },
                []
              )}
            </>
          );

          return fragment;
        }

        // Tweet photo
        if (part?.media_key && part?.url && part?.type === "photo") {
          return (
            <figure className=" mt-4">
              <img
                src={part.url}
                alt="tweet image"
                width={part.width}
                height={part.height}
              />
            </figure>
          );
        }

        if (part?.username) {
          return (
            <a
              className="font-medium hover:underline"
              href={`https://twitter.com/${part.username}`}
            >
              @{part.username}
            </a>
          );
        }

        // Quoted tweet
        if (part?.parts) {
          return (
            <Tweet id={part.id} tweet={part} quoteLevel={quoteLevel + 1} />
          );
        }

        if (part?.type === "website") {
          const image = (part.images as any[])?.at(0);

          return (
            <a
              href={part.url}
              className="flex flex-col rounded-lg overflow-hidden border border-gray-200 group"
            >
              {image && <img src={image.url} />}
              <div className="p-4 leading-snug">
                <div className="font-semibold group-hover:underline">
                  {part.title}
                </div>
                <div className="text-gray-500 text-sm mt-1">
                  {part.description}
                </div>
                <div className="font-mono text-sm text-gray-500 mt-2">
                  {part.display_url}
                </div>
              </div>
            </a>
          );
        }

        if (part.type === "video") {
          // TODO
          return null;
        }

        return (
          <div>
            {"Unhandled part:"}
            <pre>{JSON.stringify(part, undefined, 2)}</pre>
          </div>
        );
      })}
    </div>
  );
}
