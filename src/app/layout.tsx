import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import Script from "next/script";

import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import "@fortawesome/fontawesome-svg-core/styles.css";

import MainNavigation from "./MainNavigation";
import SiteContainer from "./SiteContainer";
import "../styles/blog.css";
import ClipPaths from "@components/ClipPaths";

export const metadata: Metadata = {
  title: {
    default: "David Demaree's website",
    template: "%s | David Demaree",
  },
  description:
    "This is my personal website. I'm a web designer, programmer, and tech-industry product leader. I like LEGOs, cameras, keyboards, and great coffee.",
  icons: {
    icon: "/site/icon.svg",
  },
  openGraph: {
    siteName: "David Demaree's website",
    images: {
      url: `/api/og-image`,
    },
  },
  twitter: {
    description:
      "This is my personal website. I'm a web designer, programmer, and tech-industry product leader. I like LEGOs, cameras, keyboards, and great coffee.",
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
    <html lang="en-US" data-theme={""}>
      <head>
        <Script id="dd-darkmode-init" strategy="beforeInteractive">{`
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
        <SiteContainer>
          <MainNavigation />
          {children}
        </SiteContainer>
        <ClipPaths />
      </body>
    </html>
  );
}
