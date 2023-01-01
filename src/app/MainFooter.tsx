import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faFeed } from "@fortawesome/sharp-solid-svg-icons";
import Link from "next/link";

export default function MainFooter() {
  return (
    <footer className="px-inset py-8 min-h-[12rem] flex flex-col items-center justify-end text-sm">
      <div className="text-center">
        <p className="m-0">
          Made with <FontAwesomeIcon icon={faHeart} className="text-red-500" />{" "}
          in New Jersey, U.S.A.
        </p>
        <p className="text-ink-medium m-0">
          &ldquo;Have courage, and be kind.&rdquo;
        </p>
      </div>
      <div className="mt-4 flex gap-3 justify-center">
        Subscribe to my feed:
        <Link href="/feed/rss" className="font-medium text-primary flex gap-1">
          <FontAwesomeIcon icon={faFeed} /> <span>RSS</span>
        </Link>
        <Link href="/feed/json" className="font-medium text-primary flex gap-1">
          <FontAwesomeIcon icon={faFeed} /> <span>JSON</span>
        </Link>
      </div>
    </footer>
  );
}
