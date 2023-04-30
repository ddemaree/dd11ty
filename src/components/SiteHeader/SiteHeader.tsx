/** @format */
import clsx from "clsx";
import { motion } from "framer-motion";

import { menuItems } from "../SiteMenu";
import DDIcon from "../DDIcon";
import styles from "./SiteHeader.module.css";
import { NavItem } from "../SiteMenu/NavItem";

const activeSection = null;

function SiteHeader() {
  return (
    <header
      id="nav-parent"
      className={clsx(styles.wrapper, "site-header text-xl/none")}
    >
      <a href="/">
        <DDIcon size="2em" />
      </a>

      <nav className="flex gap-[1em]">
        <ul className="contents">
          {menuItems.main.map((item, index) => (
            <NavItem
              key={index}
              itemClassName="contents"
              item={item}
              isActive={activeSection === item.slug}
            />
          ))}
        </ul>
      </nav>

      <nav></nav>
    </header>
  );
}

export default SiteHeader;
