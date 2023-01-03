export default function TweetContent({ parts = [] }) {
  return (
    <div className=" leading-snug">
      {parts.map((part) => {
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
