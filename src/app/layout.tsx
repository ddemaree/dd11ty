import { headers } from "next/headers";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import "../styles/blog.scss";

import MainNavigation from "@components/MainNavigation";
import MainFooter from "@components/MainFooter";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const colorSchemeHint = headersList.get("Sec-CH-Prefers-Color-Scheme");

  return (
    <html data-theme={colorSchemeHint}>
      <head />
      <body>
        <div className="grid grid-cols-1 grid-rows-[auto_1fr_auto]">
          <MainNavigation />
          <main>{children}</main>
          <MainFooter />
        </div>
      </body>
    </html>
  );
}
