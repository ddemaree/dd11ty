"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { load, trackPageview } from "fathom-client";

export default function FathomAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    const siteId = "TOFIAIKB";
    load(siteId, {
      includedDomains: ["demaree.me"],
      spa: "auto",
    });

    trackPageview();
  }, [pathname]);

  return null;
}
