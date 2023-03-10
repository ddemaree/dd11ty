import { useEffect, useRef } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";

import { parse } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { siteState, useSiteState } from "@lib/store";

import menus, { MenuItem } from "~/inc/menus";
import { SiteSection } from "~/env";
import "~/inc/iconLibrary";
import clsx from "clsx";

export const SiteMenu = ({
  activeSection,
}: {
  activeSection?: SiteSection;
}) => {
  const { menuOpen, isSmallScreen } = useSiteState();
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  function toggleMenuOpen(e: MouseEvent) {
    e.preventDefault();
    siteState.setKey("menuOpen", !menuOpen);
  }

  return (
    <motion.nav
      animate={menuOpen ? "open" : "closed"}
      ref={containerRef}
      initial={false}
      custom={height}
      className="z-40"
    >
      {!isSmallScreen && (
        <div className="menu-not-mobile flex gap-3">
          <ul className="contents">
            {menus.main.map((item, index) => (
              <BasicNavItem key={`menu-main-${index}`} item={item} />
            ))}
          </ul>
        </div>
      )}
      {isSmallScreen && (
        <>
          <MenuSidebar />
          <MenuItemsWrapper menuOpen={menuOpen}>
            {menus.main.map((item, index) => (
              <FancyNavItem key={`menu-main-${index}`} item={item} />
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
  const sidebarVariants: Variants = {
    open: (height = 1000) => ({
      clipPath: `circle(${height * 2 + 200}px at 260px 32px)`,
      bottom: "0px",
      position: "fixed",
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2,
      },
    }),
    closed: {
      clipPath: "circle(24px at 260px 32px)",
      position: "absolute",
      bottom: "60px",
      transition: {
        delay: 0.2,
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };
  return (
    <motion.div
      className="top-0 right-0 w-[300px] bg-pink-200 shadow-md"
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

function BasicNavItem({
  item,
  isActive,
  _isFancy: _isFancy = false,
}: {
  item: MenuItem;
  isActive?: boolean | (() => boolean);
  _isFancy?: boolean;
}) {
  const { title, href, icon } = item;

  const _iconLookup = parse.icon(icon);

  const className = clsx("contents font-semibold", _isFancy && "text-4xl");

  const ListItemTag = _isFancy ? motion.li : "li";
  const listItemProps: { className: string; variants?: Variants } = {
    className,
  };
  if (_isFancy) listItemProps.variants = navItemVariants;

  return (
    <ListItemTag {...listItemProps}>
      <a href={href} className="flex gap-1 items-center">
        {/* <FontAwesomeIcon icon={_iconLookup} fixedWidth size="sm" /> */}
        <span>{title}</span>
      </a>
    </ListItemTag>
  );
}

function FancyNavItem(props) {
  return <BasicNavItem _isFancy {...props} />;
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
    className="absolute top-2 right-4 w-12 h-12 rounded-full bg-transparent select-none"
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
