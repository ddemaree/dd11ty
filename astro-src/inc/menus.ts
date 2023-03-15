import { IconName, IconFamily } from "@fortawesome/fontawesome-svg-core";

export interface MenuItem {
  title: string;
  href: string;
  icon: string | IconName;
  iconFamily?: string | IconFamily;
  slug: string;
}

export type MenuKey = "main" | "social" | "footer";

import _menuItems from "./menuItems.json";
type ImportedMenus = typeof _menuItems;

export interface MenuItemSet extends ImportedMenus {
  main: MenuItem[];
  social?: MenuItem[];
  footer?: MenuItem[];
  [key: string]: MenuItem[];
}

const menus = _menuItems as MenuItemSet;

export default menus;
