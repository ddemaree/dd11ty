import type { Metadata } from "next";

import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import "@fortawesome/fontawesome-svg-core/styles.css";

import MainNavigation from "./MainNavigation";
import SiteContainer from "@/app/SiteContainer";
import ClipPaths from "@components/ClipPaths";
import "../styles/blog.css";
import { siteUrl } from "@lib/urls";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl("/", true)),
  title: {
    default: "David Demaree's website",
    template: "%s | David Demaree",
  },
  authors: [{ name: "David Demaree", url: "https://demaree.me" }],
  creator: "David Demaree",
  description:
    "This is my personal website. I'm a web designer, programmer, and tech-industry product leader. I like LEGOs, cameras, keyboards, and great coffee.",
  // icons: {
  //   icon: "/site/icon.svg",
  // },
  openGraph: {
    siteName: "David Demaree's website",
    locale: "en_US",
    type: "website",
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
  return (
    <html lang="en-US" data-theme={""}>
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
