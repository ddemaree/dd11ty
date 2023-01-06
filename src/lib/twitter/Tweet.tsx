// import fetchTweets from "@lib/twitter/fetchTweets";
import DisplayDate from "@components/DisplayDate";
import TweetContent from "@lib/twitter/TweetContent";
import TweetHeader from "@lib/twitter/TweetHeader";
import clsx from "clsx";

export default function Tweet({
  id,
  tweet,
  quoteLevel = 0,
}: {
  id: string;
  tweet?: any;
  quoteLevel?: number;
}) {
  const { author } = tweet;

  return (
    <figure className="flex flex-col items-center">
      <div
        className={clsx(
          "tweet-wrapper font-sans rounded-lg p-4 border border-gray-200 bg-white flex flex-col gap-3 desc:m-0 max-w-xl",
          quoteLevel > 0 && "mt-4"
        )}
      >
        <TweetHeader
          name={author.name}
          username={author.username}
          avatar={author.profile_image_url}
        />
        <div>
          <TweetContent parts={tweet.parts} quoteLevel={quoteLevel} />
        </div>
        <footer>
          <a
            href={`https://twitter.com/${author.username}/status/${tweet.id}`}
            className=" text-gray-500 font-medium text-sm no-underline hover:underline"
          >
            <DisplayDate
              dateString={tweet.created_at}
              format={{
                month: "short",
                day: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }}
            />
          </a>
        </footer>
      </div>
    </figure>
  );
}
