// `app/page.js` is the UI for the root `/` URL
import Image from "next/image";
import Link from "next/link";
import { NextSeo } from "next-seo";
import clsx from "clsx";

import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faNewspaper } from "@fortawesome/sharp-solid-svg-icons";
import {
  faTwitter,
  faLinkedin,
  faMastodon,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

import imgDavidStitch from "../assets/images/dd-stitch-transparent.png";
import styles from "./index.module.css";

function HomePageLink({
  label,
  href,
  icon: iconName,
}: {
  label: string;
  href: string;
  icon: IconProp;
}) {
  return (
    <li>
      <Link
        href={href}
        className="px-3 rounded-lg inline-flex items-center h-10 gap-3 font-semibold [font-variation-settings:'wdth'_130] bg-yellow-400 dark:bg-yellow-800/80 dark:bg-blend-multiply dark:text-yellow-200"
      >
        {iconName && <FontAwesomeIcon icon={iconName} size="sm" />}
        <span className=" translate-y-[0.03em]">{label}</span>
      </Link>
    </li>
  );
}

export default function HomePage() {
  return (
    <>
      <NextSeo
        title="David Demaree's home page"
        description="Tech product person, developer, designer"
      />
      <main className="h-full w-inset max-w-[920px] mx-auto flex items-center">
        <section
          className={clsx([
            styles["intro"],
            "@container/intro w-full max-w-4xl",
          ])}
        >
          <div className={styles["intro-grid"]}>
            <div className={styles["intro-image"]}>
              <Image
                src={imgDavidStitch}
                alt=""
                className="dark:mix-blend-multiply dark:opacity-80"
              />
            </div>

            <div
              className={clsx([
                styles["intro-lede-graf"],
                "@container/lede text-black/80 dark:text-slate-300",
              ])}
            >
              <p>
                <b className={styles["intro-double-fancy"]}>
                  <span className={styles["greeting"]}>
                    Hello<span className={styles["punc"]}>!</span> My name is
                  </span>{" "}
                  <span className={styles["name"]}>David Demaree</span>
                  <span className={styles["punc"]}>.</span>
                </b>{" "}
                I&apos;m a web coder, writer, and photographer based in suburban
                NYC
                <span className={styles["punc"]}>.</span>
              </p>
            </div>

            <h2 className={styles["intro-hed"]}>Intro</h2>
            <div>
              <p>
                This is my website where I write about tech, business, digital
                culture, and whatever else. I love good coffee, mechanical
                keyboards, Legos, my family, and my dog, not necessarily in that
                order.
              </p>
            </div>

            <h2 className={styles["intro-hed"]}>Links</h2>
            <ul className="[font-size:1.5rem] leading-none pt-2 -mt-2 flex flex-wrap justify-items-start gap-y-3 gap-x-4">
              <HomePageLink
                label="Email"
                href="mailto:david@demaree.me"
                icon={faPaperPlane}
              />
              <HomePageLink label="Blog" href="/posts" icon={faNewspaper} />
              <HomePageLink
                label="LinkedIn"
                href="https://linkedin.com/in/ddemaree"
                icon={faLinkedin}
              />
              <HomePageLink
                label="Twitter"
                href="https://twitter.com/ddemaree"
                icon={faTwitter}
              />
              <HomePageLink
                label="Mastodon"
                href="https://mastodon.social/@demaree"
                icon={faMastodon}
              />
              <HomePageLink
                label="GitHub"
                href="https://github.com/ddemaree"
                icon={faGithub}
              />
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
