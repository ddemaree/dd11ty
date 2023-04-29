import MyLinks from "@components/MyLinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/sharp-solid-svg-icons";

export default function MainFooter({
  showLinks = true,
}: {
  showLinks?: boolean;
}) {
  return (
    <footer className="flex min-h-[12rem] flex-col items-center justify-end gap-6 px-inset py-10 text-sm @container">
      {showLinks && <MyLinks className="max-w-[520px] py-4 text-xl" />}

      <div className="text-center">
        <p className="m-0">
          Made with <FontAwesomeIcon icon={faHeart} className="text-red-500" />{" "}
          in New Jersey, U.S.A.
        </p>
        <p className="text-ink-medium m-0">
          &ldquo;Have courage, and be kind.&rdquo;
        </p>
      </div>
    </footer>
  );
}
