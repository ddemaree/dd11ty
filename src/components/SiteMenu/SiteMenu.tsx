import _ from "lodash";
import React from "react";
import { motion } from "framer-motion";

import useMediaQuery from "@lib/hooks/useMediaQuery";
import { useSiteStore } from "@/lib/siteStore";
import menuItems from "./menus";
import { NavItem } from "./NavItem";
import { MobileMenu } from "./MobileMenu";
import { ThemeMenu } from "../Theming";

export const SiteMenu = ({
  mobileBreakpoint = "640px",
}: {
  mobileBreakpoint?: string;
}) => {
  const { menuOpen } = useSiteStore();

  const _isSmallScreen = useMediaQuery(
    `(max-width: ${mobileBreakpoint})`,
    false
  );
  const containerRef = React.useRef(null);

  const activeSection = null;

  return (
    <motion.nav
      animate={menuOpen ? "open" : "closed"}
      ref={containerRef}
      whileHover={menuOpen ? "open" : ["closed", "hover"]}
      initial={false}
      className="z-40 [--sidebar-width:100vw]"
    >
      {!_isSmallScreen && (
        <div className="menu-not-mobile hidden items-center gap-4 sm:flex">
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
          <ThemeMenu />
        </div>
      )}
      {_isSmallScreen && <MobileMenu activeSection={activeSection || ""} />}
    </motion.nav>
  );
};

export default SiteMenu;
