import MyLinks from "@components/MyLinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/sharp-solid-svg-icons";

import ShortBio from "@components/ShortBioText.mdx";
import Image from "next/image";

export default function MainFooter({
  showLinks = true,
}: {
  showLinks?: boolean;
}) {
  return (
    <footer className="px-inset py-8 min-h-[12rem] flex flex-col gap-4 items-center justify-end text-sm">
      <div className=" @container [&>*]:w-full">
        <figure className=" [clip-path:url(#squircleClip)] w-40 h-40">
          <Image
            src="https://res.cloudinary.com/demaree/image/twitter_name/ddemaree.jpg"
            width="120"
            height="120"
            alt="A man in an attic full of Legos"
            className="w-full h-full"
          />
        </figure>
        <div className="text-xl [&_p]:max-w-[44ch] flex flex-col gap-4">
          <ShortBio />
        </div>
      </div>
      {showLinks && <MyLinks />}

      <div className="text-center">
        <p className="m-0">
          Made with <FontAwesomeIcon icon={faHeart} className="text-red-500" />{" "}
          in New Jersey, U.S.A.
        </p>
        <p className="text-ink-medium m-0">
          &ldquo;Have courage, and be kind.&rdquo;
        </p>
      </div>

      <svg width="10" height="10" viewBox="0 0 10 10">
        <clipPath id="squircleClip" clipPathUnits="objectBoundingBox">
          <path
            fill="red"
            stroke="none"
            d="M 0,0.5 C 0,0 0,0 0.5,0 S 1,0 1,0.5 1,1 0.5,1 0,1 0,0.5"
          />
        </clipPath>
        <clipPath id="squircleBoxClip" clipPathUnits="objectBoundingBox">
          <circle cx="5" cy="5" r="5" fill="red" />
        </clipPath>
      </svg>
    </footer>
  );
}
