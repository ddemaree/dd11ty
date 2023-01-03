import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TweetHeader({ name = "", username = "", avatar = "" }) {
  return (
    <header className="tweet-header">
      <a
        href={`https://twitter.com/${username}`}
        className="flex gap-3 items-center justify-start desc:m-0 leading-tight no-underline group"
      >
        <img src={avatar} className="rounded-full w-12 h-12" />
        <div className="flex-1">
          <div className=" font-semibold group-hover:underline">{name}</div>
          <div className=" text-gray-500 text-[0.8em]">@{username}</div>
        </div>
        <FontAwesomeIcon icon={faTwitter} size="lg" />
      </a>
    </header>
  );
}
