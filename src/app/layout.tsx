import type { Metadata } from "next";
import { headers } from "next/headers";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import "../styles/blog.css";

import localFont from "next/font/local";
import { Inter, Source_Serif_4 } from "next/font/google";
import MainNavigation from "./MainNavigation";
import MainFooter from "./MainFooter";
import clsx from "clsx";

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
  const headersList = headers();
  const colorSchemeHint = headersList.get("Sec-CH-Prefers-Color-Scheme");

  return (
    <html
      data-theme={colorSchemeHint}
      className={clsx([
        monaSans.variable,
        interFont.variable,
        sourceSerifFont.variable,
      ])}
    >
      <head />
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
