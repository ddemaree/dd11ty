"use client";

import _ from "lodash";
import { useEffect, useRef, useState, MouseEvent } from "react";
import { motion } from "framer-motion";

import useMediaQuery from "@lib/hooks/useMediaQuery";
import useCurrentSiteSection from "@lib/hooks/useCurrentSiteSection";
import { ThemeMenu, ThemeSelector } from "@components/Theme";

import MenuItemsWrapper from "./MenuItemsWrapper";
import BasicNavLink, { MobileNavLink } from "./BasicNavLink";
import MenuToggleButton from "./MenuToggleButton";
import MenuSidebar from "./MenuSidebar";
import menuItems from "./menus";
import { useClientReady } from "@components/Theme/ThemeScript";

export const SiteMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const clientReady = useClientReady();
  const _isSmallScreen = useMediaQuery("(max-width: 550px)", false);
  const containerRef = useRef(null);

  const activeSection = useCurrentSiteSection();

  function toggleMenuOpen(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setMenuOpen(!menuOpen);
  }

  useEffect(() => {
    document.documentElement.classList.toggle("overflow-hidden", menuOpen);
  }, [menuOpen]);

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
              <li key={index} className="contents">
                <BasicNavLink
                  key={`menu-main-${index}`}
                  item={item}
                  isActive={activeSection === item.slug}
                />
              </li>
            ))}
          </ul>
          <ThemeMenu />
        </div>
      )}
      {clientReady && _isSmallScreen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur"
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
          <MenuSidebar />
          <MenuItemsWrapper menuOpen={menuOpen}>
            {menuItems.main.map((item, index) => (
              <MobileNavLink
                item={item}
                key={`menu-mobile-${index}`}
                isActive={activeSection === item.slug}
              />
            ))}
            <div className="flex-1"></div>
            <motion.div
              className="py-6 text-2xl"
              variants={{
                open: { opacity: 1, y: 0 },
                closed: { opacity: 0, y: 20 },
              }}
            >
              <ThemeSelector variant="row" />
            </motion.div>
          </MenuItemsWrapper>
          <MenuToggleButton toggle={toggleMenuOpen} />
        </>
      )}
    </motion.nav>
  );
};

export default SiteMenu;
