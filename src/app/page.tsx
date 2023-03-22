import { Metadata } from "next";
import Image from "next/image";
import clsx from "clsx";

import MyLinks from "@components/MyLinks";
import ShortBio from "@components/ShortBio";
import { siteUrl } from "@lib/urls";

import imgDavidStitch from "../assets/images/dd-stitch-transparent.png";
import styles from "./styles.module.css";

export const metadata: Metadata = {
  alternates: {
    canonical: siteUrl("/", true),
  },
};

export default function HomePage() {
  return (
    <main className="pb-20 px-inset align-middle self-center justify-self-center @container/intro w-full max-w-3xl">
      <div className={clsx([styles["intro-grid"]])}>
        <div className={clsx(styles["intro-image"])}>
          <Image
            src={imgDavidStitch}
            alt="A man in a ridiculous hat"
            className="dark:mix-blend-multiply dark:opacity-80"
            width={200}
            priority
          />
        </div>

        <ShortBio />
        <MyLinks
          className="max-w-[480px] justify-self-start"
          variant="homepage"
        />
      </div>
    </main>
  );
}
