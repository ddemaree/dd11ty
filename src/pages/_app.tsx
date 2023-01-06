import type { AppProps } from "next/app";
import { Helmet } from "react-helmet";
import clsx from "clsx";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import "../styles/blog.scss";

import localFont from "@next/font/local";

import MainNavigation from "@components/MainNavigation";
import MainFooter from "@components/MainFooter";

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
      <Helmet
        htmlAttributes={{
          lang: "en",
          className: clsx([monaSans.variable]),
        }}
        title="⚡️ David Demaree • Internet Person &amp; Product Leader"
        meta={[
          {
            name: "viewport",
            content: "width=device-width, initial-scale=1",
          },
          { property: "og:title", content: "Hello next.js!" },
        ]}
      />
      <div className="grid grid-cols-1 grid-rows-[auto_1fr_auto]">
        <MainNavigation />
        <main>
          <Component {...pageProps} />;
        </main>
        <MainFooter />
      </div>
    </>
  );
}
