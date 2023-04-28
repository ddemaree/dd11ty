import MyLinks from "@components/MyLinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/sharp-solid-svg-icons";

import ShortBio from "@components/ShortBio";
import Image from "next/image";

export default function MainFooter({
  showLinks = true,
}: {
  showLinks?: boolean;
}) {
  return (
    <footer className="@container px-inset py-10 min-h-[12rem] flex flex-col gap-6 items-center justify-end text-sm">
      <div className="grid grid-cols-1 grid-flow-row justify-items-center text-center @lg:text-left gap-3 gap-x-6">
        <figure className="[clip-path:url(#squircleClip)] aspect-square w-[min(22cqw,120px)] ">
          <Image
            src="https://img.demaree.me/twitter_name/ddemaree.jpg"
            width="120"
            height="120"
            alt="A man in an attic full of Legos"
            className="w-full h-full"
          />
        </figure>

        <ShortBio className="text-lg/snug flex-col flex gap-y-4 desc-[p:first-of-type]:text-xl/snug desc-any:max-w-xl" />
      </div>

      {showLinks && <MyLinks className="text-xl max-w-[520px] py-4" />}

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
