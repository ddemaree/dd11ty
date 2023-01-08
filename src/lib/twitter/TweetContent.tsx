import { uniqueId } from "lodash";
import Image from "next/image";
import Tweet from "./Tweet";

export default function TweetContent({ parts = [], quoteLevel = 0 }) {
  const keyPrefix = uniqueId();

  return (
    <div className=" leading-snug">
      {parts.map((part: TwitterPart, idx: number) => {
        const key = `${keyPrefix}-${idx}`;

        if (typeof part === "string") {
          // TODO: Handle line breaks

          const substrings = (part as string).split(/\n/);

          if (substrings.length === 1) return part;

          const fragment = (
            <>
              {substrings.reduce(
                (output: any[], substr: string, idx: number) => {
                  if (idx > 0) output.push(<br key={`br-${idx}`} />);

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
            <figure key={key} className=" mt-4">
              <Image
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
              key={key}
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
            <Tweet
              key={key}
              id={part.id}
              tweet={part}
              quoteLevel={quoteLevel + 1}
            />
          );
        }

        if (part?.type === "website") {
          const image = (part.images as TwitterMedia[])?.at(0);

          return (
            <a
              key={key}
              href={part.url}
              className="flex flex-col rounded-lg overflow-hidden border border-gray-200 group"
            >
              {image && (
                <Image
                  alt={`Tweet image for ${part.title}`}
                  src={image.url}
                  width={image.width}
                />
              )}
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
          <div key={key}>
            {"Unhandled part:"}
            <pre>{JSON.stringify(part, undefined, 2)}</pre>
          </div>
        );
      })}
    </div>
  );
}
