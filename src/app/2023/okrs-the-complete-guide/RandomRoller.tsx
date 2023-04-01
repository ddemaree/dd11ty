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
import { forwardRef, PropsWithChildren, useRef, useState } from "react";

import Script from "next/script";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateLeft,
  faVolumeHigh,
  faVolumeMute,
} from "@fortawesome/sharp-solid-svg-icons";

type RollerProps = PropsWithChildren<{ roll: string; initialLoad: boolean }>;

const ROKRollVideo = forwardRef<HTMLVideoElement, { isMuted: boolean }>(
  ({ isMuted = true }, ref) => {
    return (
      <video
        ref={ref}
        width="640"
        height="360"
        className="w-full"
        autoPlay
        muted={isMuted}
      >
        <source
          src="https://res.cloudinary.com/demaree/video/upload/f_webm/rokroll_hjj4ox.webm"
          type="video/mp4"
        />
        <source
          src="https://res.cloudinary.com/demaree/video/upload/f_mp4/rokroll_hjj4ox.mp4"
          type="video/mp4"
        />
        <p>You can&rsquo;t play this video</p>
      </video>
    );
  }
);

ROKRollVideo.displayName = "ROKRollVideo";

export default function RandomRollOnScroll({
  initialLoad = false,
}: RollerProps) {
  const [scrollFinished, setScrollFinished] = useState(initialLoad);
  const [isMuted, setIsMuted] = useState(true);

  const videoPlayerRef = useRef<HTMLVideoElement>(null);

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

  useMotionValueEvent(realFakeTextScrollYProgress, "change", (latest) => {
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
          {scrollFinished && (
            <div className="w-full max-w-[720px] relative">
              <ROKRollVideo isMuted={isMuted} ref={videoPlayerRef} />
              <button
                onClick={(e) => setIsMuted(!isMuted)}
                className="absolute top-4 right-4 text-white text-2xl/none"
              >
                <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeHigh} />
                <span className="sr-only">{isMuted ? "Muted" : "Loud"}</span>
              </button>
              <button
                className="absolute top-4 left-4 text-2xl/none text-white"
                onClick={(e) => {
                  e.preventDefault();
                  if (videoPlayerRef.current) {
                    videoPlayerRef.current.currentTime = 0;
                    videoPlayerRef.current.play();
                  }
                }}
              >
                <FontAwesomeIcon icon={faArrowRotateLeft} />
                <span className="sr-only">Restart video</span>
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}
