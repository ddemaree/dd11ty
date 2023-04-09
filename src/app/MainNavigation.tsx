import { Suspense } from "react";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDDLogo } from "@lib/icons";
import { SiteMenu, type SiteSection } from "@components/SiteMenu";
// import ThemeMenu from "@components/ThemeMenu";

export default function MainNavigation() {
  let pathname = "";
  let sectionName: SiteSection | null = null;

  if (pathname.match(/^post/)) sectionName = "blog";
  else if (pathname.match(/^about/)) sectionName = "about";
  else if (!pathname) sectionName = "home";

  return (
    <header
      id="nav-parent"
      className="px-inset h-20 flex gap-8 items-center justify-between"
    >
      <div>
        <Link href="/">
          <FontAwesomeIcon icon={faDDLogo} size="2x" />
          <span className="sr-only">David Demaree</span>
        </Link>
      </div>

      {/* <ThemeMenu /> */}
      <Suspense fallback={<div>Loading...</div>}>
        <SiteMenu />
      </Suspense>
    </header>
  );
}
