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

// const monaSans = localFont({
//   src: "../assets/fonts/Mona-Sans.woff2",
//   variable: "--font--mona-sans",
//   weight: "200 900",
//   fallback: [
//     'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
//   ],
// });

export default function MyApp({ Component, pageProps }: AppProps) {
  const defaultImageURLString = getSocialImageURL() as string;

  return (
    <>
      <DefaultSeo
        defaultTitle="demaree.me"
        titleTemplate="%s • demaree.me"
        additionalLinkTags={[{ rel: "icon", href: "/dyn-icon.svg" }]}
        openGraph={{
          type: "website",
          locale: "en_US",
          url: "https://demaree.me/",
          siteName: "demaree.me",
          images: [{ url: defaultImageURLString, ...SOCIAL_IMAGE_PARAMS }],
        }}
        twitter={{
          handle: "@ddemaree",
          site: "@ddemaree",
          cardType: "summary_large_image",
        }}
      />
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
