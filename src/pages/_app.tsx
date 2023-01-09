import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";

import clsx from "clsx";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import "../styles/blog.scss";

import localFont from "@next/font/local";

import MainNavigation from "@components/MainNavigation";
import MainFooter from "@components/MainFooter";
import { getSocialImageData } from "@components/head/SocialImage";

const monaSans = localFont({
  src: "../assets/fonts/Mona-Sans.woff2",
  variable: "--font--mona-sans",
  weight: "200 900",
  fallback: [
    'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  ],
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
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
