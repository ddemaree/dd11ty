"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { load, trackPageview } from "fathom-client";

export default function SiteContainer({
  children,
}: React.PropsWithChildren<{}>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const siteId = "TOFIAIKB";
    load(siteId, {
      includedDomains: ["demaree.me"],
      spa: "auto",
    });

    trackPageview();
  }, [pathname, searchParams]);

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-1 grid-rows-[auto_1fr_auto] min-h-screen max-w-6xl w-full">
        {children}
      </div>
    </div>
  );
}
