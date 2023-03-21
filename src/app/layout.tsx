import type { Metadata } from "next";
import { cookies, headers } from "next/headers";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import "../styles/blog.css";

import localFont from "next/font/local";
import { Inter, Source_Serif_4 } from "next/font/google";
import MainNavigation from "./MainNavigation";
import MainFooter from "./MainFooter";
import clsx from "clsx";
import Script from "next/script";

const interFont = Inter({
  variable: "--font--inter",
  subsets: ["latin"],
});

const sourceSerifFont = Source_Serif_4({
  variable: "--font--source-serif",
  subsets: ["latin"],
});

const monaSans = localFont({
  src: "../assets/fonts/Mona-Sans.woff2",
  variable: "--font--mona-sans",
  weight: "200 900",
  fallback: [
    'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  ],
});

export const metadata: Metadata = {
  title: {
    default: "David Demaree's website",
    template: "%s | David Demaree",
  },
  description: "A good man, and thorough",
  icons: {
    icon: "/site/icon.svg",
  },
  alternates: {
    types: {
      "application/rss+xml": "/feed",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const COOKIE_NAME = "_dd_colorScheme";
  const headersList = headers();
  const colorSchemeHint = headersList.get("Sec-CH-Prefers-Color-Scheme");

  const cookieJar = cookies();
  const cookieTheme = cookieJar.get(COOKIE_NAME);

  return (
    <html data-theme={colorSchemeHint}>
      <head>
        <Script strategy="beforeInteractive">{`
        window.themeInfo = {};

        const COOKIE_NAME = "${COOKIE_NAME}";
        const CLIENT_HINT_THEME = "${colorSchemeHint}";
        const COOKIE_THEME = "${cookieTheme ? cookieTheme.value : ""}";
        let themeSource = "";

        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
        const prefersLight = window.matchMedia("(prefers-color-scheme: light)");
        const noPreference = window.matchMedia("(prefers-color-scheme: no-preference)");

        const serverTheme = CLIENT_HINT_THEME || COOKIE_THEME;

        // console.log({CLIENT_HINT_THEME, COOKIE_THEME, prefersDark, prefersLight});

        if(serverTheme) {
          themeSource = COOKIE_THEME ? "cookie" : "clientHint";
          themeValue = serverTheme;
        } else if(prefersDark.matches) {
          themeSource = "mediaQuery";
          themeValue = "dark";
        } else {
          themeSource = "mediaQuery";
          themeValue = "light";
        }

        window.themeInfo.source = themeSource;
        window.themeInfo.value = themeValue;
        `}</Script>
      </head>
      <body className="bg-stone-50 dark:bg-[#121212] text-stone-700 dark:text-stone-300">
        <div className="grid grid-cols-1 grid-rows-[auto_1fr_auto]">
          <MainNavigation />
          <main>{children}</main>
          <MainFooter />
        </div>
      </body>
    </html>
  );
}
