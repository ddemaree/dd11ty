import type {
  IconName,
  IconFamily,
  IconLookup,
} from "@fortawesome/fontawesome-svg-core";

export type SiteSection = "home" | "about" | "blog";

export interface MenuItem {
  title: string;
  href: string;
  icon: string | IconName | IconLookup;
  iconFamily?: string | IconFamily;
  slug?: SiteSection | string;
  hidden?: boolean;
}

import { faMastodon, faTwitter } from "@fortawesome/free-brands-svg-icons";

import {
  faFeed,
  faHomeHeart,
  faNewspaper,
  faPaperPlane,
  faUserNinja,
} from "@fortawesome/sharp-solid-svg-icons";

function defineMenuItem(itemData: MenuItem) {
  return itemData;
}

function defineMenuSet(items: MenuItem[]) {
  return items;
}

export const menuItems = {
  main: defineMenuSet([
    defineMenuItem({
      title: "Home",
      href: "/",
      icon: faHomeHeart,
      slug: "home",
    }),
    defineMenuItem({
      title: "About Me",
      href: "/about",
      icon: faUserNinja,
      slug: "about",
      hidden: false,
    }),
    defineMenuItem({
      title: "Archive",
      href: "/posts",
      icon: faNewspaper,
      slug: "blog",
    }),
    defineMenuItem({
      title: "Contact",
      href: "/contact",
      icon: faPaperPlane,
      slug: "contact",
    }),
  ]),
  social: defineMenuSet([
    {
      title: "ddemaree on Twitter",
      href: "https://twitter.com/ddemaree",
      icon: faTwitter,
    },
    {
      title: "ddemaree on Mastodon (me.dm)",
      href: "https://me.dm/@ddemaree",
      icon: faMastodon,
    },
    {
      title: "RSS feed",
      href: "/feed",
      icon: faFeed,
    },
  ]),
} as const;

export default menuItems;

export type MenuItemSet = typeof menuItems;
export type MenuKey = keyof MenuItemSet;
export type SectionNames = (typeof menuItems)[MenuKey][number]["slug"];
