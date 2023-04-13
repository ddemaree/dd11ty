import { Suspense } from "react";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faDDLogo } from "@lib/icons";
import { SiteMenu, type SiteSection } from "@components/SiteMenu";
import { ThemeMenu } from "@components/Theme";

export default function MainNavigation() {
  let pathname = "";
  let sectionName: SiteSection | null = null;

  if (pathname.match(/^post/)) sectionName = "blog";
  else if (pathname.match(/^about/)) sectionName = "about";
  else if (!pathname) sectionName = "home";

  return (
    <header
      id="nav-parent"
      className="grid h-20 grid-cols-[auto,1fr] items-center gap-8 px-inset"
    >
      <div>
        <Link href="/">
          <FontAwesomeIcon icon={faDDLogo} size="2x" />
          <span className="sr-only">David Demaree</span>
        </Link>
      </div>

      <div className="flex items-center justify-end gap-3">
        <Suspense fallback={<div>Loading...</div>}>
          <SiteMenu />
        </Suspense>
      </div>
    </header>
  );
}
