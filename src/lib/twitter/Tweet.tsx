// import fetchTweets from "@lib/twitter/fetchTweets";
import DisplayDate from "@components/DisplayDate";
import TweetContent from "@lib/twitter/TweetContent";
import TweetHeader from "@lib/twitter/TweetHeader";

export default function Tweet({ id, tweet }: { id: string; tweet?: any }) {
  const { author } = tweet;

  return (
    <div className="tweet-wrapper font-sans rounded-lg p-4 border border-gray-200 bg-white flex flex-col gap-3 desc:m-0">
      <TweetHeader
        name={author.name}
        username={author.username}
        avatar={author.profile_image_url}
      />
      <div>
        <TweetContent parts={tweet.parts} />
      </div>
      <footer>
        <a
          href={`https://twitter.com/${author.username}/status/${tweet.id}`}
          className=" text-gray-500 font-medium text-base no-underline hover:underline"
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
  );
}
