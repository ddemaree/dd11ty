import {
  IconName,
  IconFamily,
  IconLookup,
} from "@fortawesome/fontawesome-svg-core";
import { faMastodon, faTwitter } from "@fortawesome/free-brands-svg-icons";
import {
  faHomeHeart,
  faNewspaper,
  faUserNinja,
} from "@fortawesome/sharp-solid-svg-icons";

export type MenuKey = "main" | "social" | "footer";

export type SiteSection = "home" | "about" | "blog";

export interface MenuItem {
  title: string;
  href: string;
  icon: string | IconName | IconLookup;
  iconFamily?: string | IconFamily;
  slug?: string;
  hidden?: boolean;
}

export interface MenuItemSet {
  main: MenuItem[];
  [key: string]: MenuItem[];
}

const menuItems: MenuItemSet = {
  main: [
    {
      title: "Home",
      href: "/",
      icon: faHomeHeart,
      slug: "home",
    },
    {
      title: "About",
      href: "/about",
      icon: faUserNinja,
      slug: "about",
      hidden: true,
    },
    {
      title: "Blog",
      href: "/posts",
      icon: faNewspaper,
      slug: "blog",
    },
  ],
  social: [
    {
      title: "ddemaree on Twitter",
      href: "https://twitter.com/ddemaree",
      icon: faTwitter,
    },
    {
      title: "ddemaree on Mastodon (me.dm)",
      href: "https://me.dm/ddemaree",
      icon: faMastodon,
    },
  ],
};

export default menuItems;
