"use client";

import Prose from "@components/Prose";
import IntroText from "./IntroText.mdx";
import CatIpsum from "./CatIpsum.mdx";
import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { PropsWithChildren, useEffect, useRef, useState } from "react";

import YouTube, {
  YouTubeProps,
  YouTubePlayer,
  YouTubeEvent,
} from "react-youtube";
import Script from "next/script";

declare global {
  interface Window {
    YT: any;
  }
}

type RollerProps = PropsWithChildren<{ roll: string; initialLoad: boolean }>;

export default function RandomRollOnScroll({
  roll,
  children,
  initialLoad = false,
}: RollerProps) {
  const videoId = roll.replace("https://www.youtube.com/embed/", "");
  const [scrollFinished, setScrollFinished] = useState(initialLoad);

  const ytPlayerRef = useRef<YouTubePlayer>(null);
  const realFakeTextRef = useRef(null);
  const { scrollYProgress: realFakeTextScrollYProgress } = useScroll({
    target: realFakeTextRef,
    offset: ["0 0", "1 0"],
  });
  const boxOffset = useTransform(
    realFakeTextScrollYProgress,
    [0, 0.7, 1],
    ["100vh", "100vh", "0vh"]
  );
  const opacityOffset = useTransform(
    realFakeTextScrollYProgress,
    [0, 0.5, 1],
    [1, 1, 0]
  );

  // function learnTheSecret() {
  //   if (ytPlayerRef.current !== null) {
  //     ytPlayerRef.current.playVideo();
  //   } else {
  //     console.log("Player not ready yet.");
  //   }
  // }

  useEffect(() => {
    console.log("YT Player ref:", ytPlayerRef.current);

    if (window.YT !== undefined) {
      const player = new window.YT.Player("ytPlayerContainer", {
        height: "390",
        width: "640",
        videoId: videoId,
        playerVars: {
          playsinline: 1,
          modestbranding: 1,
          autoplay: 1,
          controls: 0,
          fs: 0,
          loop: 1,
        },
        events: {
          onReady: (event: YouTubeEvent) => {
            console.log("YT Player ready:", event.target);
          },
        },
      });

      ytPlayerRef.current = player;

      // setTimeout(() => {
      //   learnTheSecret();
      // }, 1000);
    }
  }, [videoId, scrollFinished]);

  /* 
  <box with real fake text> - track scrolling of this one

  <box with cat fake text> - animate opacity of this one

  <box with video> - animate this one onto the page
  */
  useMotionValueEvent(realFakeTextScrollYProgress, "change", (latest) => {
    // console.log("Element scroll: ", latest);
    if (latest >= 1) {
      setScrollFinished(true);
    }
  });

  return (
    <>
      <Script
        src="https://www.youtube.com/iframe_api"
        strategy="afterInteractive"
      />
      <Prose ref={realFakeTextRef}>
        <figure className="alignwide">
          <Image
            src="https://img.demaree.me/upload/v1680355200/ddemaree_business_cats_presenting_a_goal_setting_framework_to_t_c8109d47-0c57-426d-a9b8-0e1c16ce366b_kthqa6.png"
            alt={""}
            width={1024}
            height={576}
            priority
          />
        </figure>
        <IntroText />
      </Prose>

      <motion.div
        className="prose h-[100vh] mt-8"
        style={{ opacity: opacityOffset }}
      >
        <CatIpsum />
      </motion.div>

      <motion.div
        className="w-full h-screen aspect-video fixed inset-0 bg-blue-200 z-50"
        initial={{ y: "100vh" }}
        style={{ y: scrollFinished ? 0 : boxOffset }}
      >
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div id="ytPlayerContainer"></div>
          {/* <p>You've been rolled</p>
          <p>Happy April 1</p> */}
        </div>
      </motion.div>
    </>
  );
}

/* 


<iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/_caMQpiwiaU"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>

        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/lOqy8cC72wA"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>*/
