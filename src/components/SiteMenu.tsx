"use client";

import {
  useEffect,
  useRef,
  useState,
  PropsWithChildren,
  MouseEventHandler,
  MouseEvent,
} from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { IconLookup, parse } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx, { ClassValue } from "clsx";

import useMediaQuery from "@lib/hooks/useMediaQuery";
import menuItems, { type MenuItem, type SiteSection } from "./menus";
import _ from "lodash";

export const SiteMenu = ({
  activeSection,
}: {
  activeSection?: SiteSection | null;
}) => {
  const [clientReady, setClientReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const _isSmallScreen = useMediaQuery("(max-width: 550px)", false);
  const containerRef = useRef(null);

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
              <motion.li
                variants={navItemVariants}
                key={`menu-main-${index}`}
                className="text-4xl"
              >
                <BasicNavLink
                  item={item}
                  isActive={activeSection === item.slug}
                />
              </motion.li>
            ))}
          </MenuItemsWrapper>
          <MenuToggleButton toggle={toggleMenuOpen} />
        </>
      )}
    </motion.nav>
  );
};

export default SiteMenu;

type MenuItemsWrapperProps = PropsWithChildren<{ menuOpen: boolean }>;

const MenuItemsWrapper = ({ children, menuOpen }: MenuItemsWrapperProps) => {
  const itemVariants: Variants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.ul
          className="absolute flex flex-col gap-4 justify-center p-6 w-[var(--sidebar-width)] right-0 bottom-16 top-0"
          variants={itemVariants}
          initial={"closed"}
          exit={"closed"}
        >
          {children}
        </motion.ul>
      )}
    </AnimatePresence>
  );
};

const MenuSidebar = ({ menuOpen = false }: { menuOpen: boolean }) => {
  const sidebarVariants: Variants = {
    open: {
      clipPath: `circle(1800px at 300px 40px)`,
      bottom: "0px",
      position: "fixed",
      height: "100dvh",
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    closed: {
      clipPath: `circle(24px at 300px 40px)`,
      position: "absolute",
      bottom: "60px",
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    hover: {
      clipPath: `circle(32px at 300px 40px)`,
      opacity: 0.3,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      className="top-0 right-0 w-[var(--sidebar-width)] shadow-md bg-red-400 dark:bg-red-800"
      variants={sidebarVariants}
    />
  );
};

const navItemVariants: Variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

function BasicNavLink({
  item,
  isActive,
  activeClass = "scale-105",
}: {
  item: MenuItem;
  isActive?: boolean | (() => boolean);
  activeClass?: ClassValue;
}) {
  const { title, href, icon, hidden } = item;

  if (hidden) return null;

  let _iconLookup: IconLookup;

  if (_.isString(icon)) _iconLookup = parse.icon(icon);
  else _iconLookup = icon;

  const applyActiveStyle =
    typeof isActive === "function" ? isActive() : !!isActive;

  const underlineStyle =
    "after:block after:absolute after:bottom-[-0.2em] after:h-[0.1em] after:inset-x-0 after:w-full after:bg-current after:rounded-[4px] after:origin-center";

  const classValue = clsx(
    "hover:text-red-500",
    applyActiveStyle && [activeClass]
  );

  const innerClassValue = clsx(
    "relative inline-flex gap-1 items-center",
    underlineStyle,
    !applyActiveStyle &&
      "hover:after:scale-x-100 after:scale-x-0 after:transition-all"
  );

  return (
    <a href={href} data-active={applyActiveStyle} className={classValue}>
      <span className={innerClassValue}>
        <FontAwesomeIcon
          icon={_iconLookup}
          fixedWidth
          size="sm"
          className=" opacity-60"
        />
        <span className="font-semibold">{title}</span>
      </span>
    </a>
  );
}

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
);

export const MenuToggleButton = ({
  toggle,
}: {
  toggle: MouseEventHandler<HTMLButtonElement>;
}) => (
  <button
    className="absolute top-[15px] right-4 w-12 h-12 rounded-full bg-transparent select-none"
    onClick={toggle}
  >
    <motion.svg
      style={{ position: "absolute", top: 15 }}
      initial={{ left: 13 }}
      variants={{
        closed: { left: 13 },
        open: { left: 14 },
      }}
      width="23"
      height="23"
      viewBox="0 0 23 23"
    >
      <g className="fill-current stroke-current">
        <Path
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" },
          }}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346" },
            open: { d: "M 3 2.5 L 17 16.346" },
          }}
        />
      </g>
    </motion.svg>
  </button>
);
