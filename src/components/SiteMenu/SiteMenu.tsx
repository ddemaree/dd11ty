"use client";

import { useEffect, useRef, useState, MouseEvent } from "react";
import { motion } from "framer-motion";

import useMediaQuery from "@lib/hooks/useMediaQuery";
import menuItems from "./menus";
import _ from "lodash";
import useCurrentSiteSection from "@lib/hooks/useCurrentSiteSection";
import MenuItemsWrapper from "./MenuItemsWrapper";
import BasicNavLink, { MobileNavLink } from "./BasicNavLink";
import MenuToggleButton from "./MenuToggleButton";
import MenuSidebar from "./MenuSidebar";

export const SiteMenu = () => {
  const [clientReady, setClientReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const _isSmallScreen = useMediaQuery("(max-width: 550px)", false);
  const containerRef = useRef(null);

  const activeSection = useCurrentSiteSection();

  function toggleMenuOpen(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setMenuOpen(!menuOpen);
  }

  useEffect(() => {
    setClientReady(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("overflow-hidden", menuOpen);
  }, [menuOpen]);

  return (
    <motion.nav
      animate={menuOpen ? "open" : "closed"}
      ref={containerRef}
      whileHover={menuOpen ? "open" : ["closed", "hover"]}
      initial={false}
      className="z-40 [--sidebar-width:min(100vw,340px)]"
    >
      {!_isSmallScreen && (
        <div className="hidden sm:flex menu-not-mobile gap-4">
          <ul className="contents">
            {menuItems.main.map((item, index) => (
              <li key={index} className="contents">
                <BasicNavLink
                  key={`menu-main-${index}`}
                  item={item}
                  isActive={activeSection === item.slug}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
      {clientReady && _isSmallScreen && (
        <>
          <motion.div
            className="inset-0 fixed bg-black/50 backdrop-blur"
            variants={{
              open: {
                display: "block",
                opacity: 1,
                pointerEvents: "auto",
              },
              closed: {
                display: "none",
                opacity: 0,
                pointerEvents: "none",
              },
            }}
          />
          <MenuSidebar menuOpen={menuOpen} />
          <MenuItemsWrapper menuOpen={menuOpen}>
            {menuItems.main.map((item, index) => (
              <MobileNavLink
                item={item}
                key={`menu-mobile-${index}`}
                isActive={activeSection === item.slug}
              />
            ))}
          </MenuItemsWrapper>
          <MenuToggleButton toggle={toggleMenuOpen} />
        </>
      )}
    </motion.nav>
  );
};

export default SiteMenu;
