// import clsx from "clsx";
// import localFont from "@next/font/local";

import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import "../styles/blog.scss";

import { getSocialImageURL, SOCIAL_IMAGE_PARAMS } from "@lib/siteUtils";
import { DefaultSeo } from "next-seo";

import MainNavigation from "@components/MainNavigation";
import MainFooter from "@components/MainFooter";
import { DEFAULT_META } from "@lib/meta";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...DEFAULT_META} />
      <div className="grid grid-cols-1 grid-rows-[auto_1fr_auto]">
        <MainNavigation />
        <main>
          <Component {...pageProps} />;
        </main>
        <MainFooter />
      </div>
      <Analytics />
    </>
  );
}
