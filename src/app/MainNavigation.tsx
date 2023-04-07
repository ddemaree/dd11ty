import { headers } from "next/headers";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faDDLogo } from "@lib/icons";
import SiteMenu from "@components/SiteMenu";
import { SiteSection } from "@components/menus";
// import ThemeMenu from "@components/ThemeMenu";

export default function MainNavigation() {
  const headersList = headers();
  const urlHeader = headersList.get("x-request-url") as string;
  const requestUrl = new URL(urlHeader);

  const pathname = requestUrl.pathname.slice(1);
  const pathSegments = pathname.split("/");
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
      <SiteMenu activeSection={sectionName} />
    </header>
  );
}
