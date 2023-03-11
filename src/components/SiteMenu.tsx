import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";

import { parse } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { siteState, useSiteState } from "@lib/store";

import menus, { MenuItem } from "~/inc/menus";
import { SiteSection } from "~/env";
import "~/inc/iconLibrary";
import useMediaQuery from "@lib/hooks/useMediaQuery";
import clsx, { ClassValue } from "clsx";

export const SiteMenu = ({
  activeSection,
}: {
  activeSection?: SiteSection;
}) => {
  const [clientReady, setClientReady] = useState(false);
  const { menuOpen } = useSiteState();
  const _isSmallScreen = useMediaQuery("(max-width: 550px)", true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  function toggleMenuOpen(e: MouseEvent) {
    e.preventDefault();
    console.log(height);
    siteState.setKey("menuOpen", !menuOpen);
  }

  useEffect(() => {
    setClientReady(true);
  });

  return (
    <motion.nav
      animate={menuOpen ? "open" : "closed"}
      whileHover={menuOpen ? "open" : ["closed", "hover"]}
      ref={containerRef}
      initial={false}
      className="z-40"
    >
      {!_isSmallScreen && (
        <div className="menu-not-mobile flex gap-3">
          <ul className="contents">
            {menus.main.map((item, index) => (
              <li key={index} className="contents">
                <BasicNavLink
                  key={`menu-main-${index}`}
                  item={item}
                  isActive={() => item.slug && activeSection === item.slug}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
      {clientReady && _isSmallScreen && (
        <>
          <MenuSidebar />
          <MenuItemsWrapper menuOpen={menuOpen}>
            {menus.main.map((item, index) => (
              <motion.li
                variants={navItemVariants}
                key={`menu-main-${index}`}
                className="text-4xl"
              >
                <BasicNavLink
                  item={item}
                  isActive={() => item.slug && activeSection === item.slug}
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

const MenuItemsWrapper = ({ children, menuOpen }) => {
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
          className="absolute flex flex-col gap-4 justify-center p-6 w-[280px] right-0 bottom-16 top-0"
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

const MenuSidebar = () => {
  const [headerHeight, setHeaderHeight] = useState(80);

  const menuDotCenterY = headerHeight / 2;

  const sidebarVariants: Variants = {
    open() {
      return {
        clipPath: `circle(3000px at 260px ${menuDotCenterY}px)`,
        bottom: "0px",
        position: "fixed",
        backgroundColor: "var(--menu-open-bg, #f0f)",
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 40,
          restDelta: 2,
        },
      };
    },
    closed: {
      clipPath: `circle(24px at 260px ${menuDotCenterY}px)`,
      position: "absolute",
      bottom: "60px",
      backgroundColor: "var(--menu-closed-bg, #ff00ff00)",
      opacity: 0,
      transition: {
        delay: 0.2,
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    hover: {
      clipPath: `circle(30px at 260px ${menuDotCenterY}px)`,
      backgroundColor: "var(--menu-open-bg, #f0f)",
      opacity: 0.3,
    },
  };

  useEffect(() => {
    const header = document.querySelector("header.nav-parent");
    setHeaderHeight(header.clientHeight);
  });

  return (
    <motion.div
      className="top-0 right-0 w-[300px] shadow-md"
      custom={headerHeight}
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
  const { title, href, icon } = item;

  const _iconLookup = parse.icon(icon);

  const applyActiveStyle =
    typeof isActive === "function" ? isActive() : !!isActive;

  const classValue = clsx(
    "relative flex gap-1 items-center after:block after:absolute after:bottom-[-4px] after:h-[4px] after:inset-x-0 after:w-full after:bg-red-600 after:rounded-[4px] after:origin-center after:scale-x-0 after:transition-all hover:after:scale-x-100 hover:text-red-500",
    applyActiveStyle && activeClass
  );

  return (
    <a href={href} data-active={applyActiveStyle} className={classValue}>
      <FontAwesomeIcon icon={_iconLookup} fixedWidth size="sm" />
      <span className="font-semibold">{title}</span>
    </a>
  );
}

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

export const MenuToggleButton = ({ toggle }) => (
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
    </motion.svg>
  </button>
);

export const useDimensions = (ref: any) => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    dimensions.current.width = ref.current.offsetWidth;
    dimensions.current.height = ref.current.offsetHeight;

    const onResize = function (e: UIEvent) {
      dimensions.current.width = ref.current.offsetWidth;
      dimensions.current.height = ref.current.offsetHeight;
      console.log({ dimensions, ref });
    };

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, [ref]);

  return dimensions.current;
};
