import { SiteSection } from "@components/SiteMenu/menus";
import {
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
} from "next/navigation";

export default function useCurrentSiteSection(): SiteSection | null {
  const route = useSelectedLayoutSegment();
  const sections = useSelectedLayoutSegments();

  if (sections.includes("(blog)")) {
    return "blog";
  }

  if (sections.includes("(home)")) {
    return "home";
  }

  if (route === "about") return "about";

  return null;
}
