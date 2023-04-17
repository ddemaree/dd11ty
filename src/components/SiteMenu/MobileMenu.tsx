import React from "react";
import type { PropsWithChildren, MouseEventHandler, MouseEvent } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

import { useSiteStore } from "@/lib/siteStore";

import menuItems from "./menus";
import { MobileNavItem } from "./NavItem";

export function MobileMenu({ activeSection }: { activeSection: string }) {
  const { menuOpen, toggleMenu } = useSiteStore();

  function toggleMenuOpen(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    toggleMenu();
  }

  React.useEffect(() => {
    document.documentElement.classList.toggle("overflow-hidden", menuOpen);
  }, [menuOpen]);

  return (
    <>
      <MenuSidebar />
      <MenuItemsWrapper menuOpen={menuOpen}>
        {menuItems.main.map((item, index) => (
          <MobileNavItem
            item={item}
            key={`menu-mobile-${index}`}
            isActive={activeSection === item.slug}
          />
        ))}

        <div className="flex-1"></div>

        {/* Mobile theme switcher */}
        <motion.div
          className="py-6 text-2xl"
          variants={{
            open: { opacity: 1, y: 0 },
            closed: { opacity: 0, y: 20 },
          }}
        >
          {/* <ThemeSelector variant="row" /> */}
        </motion.div>
      </MenuItemsWrapper>
      <HamburgerMenuButton toggle={toggleMenuOpen} />
    </>
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

const HamburgerMenuButton = ({
  toggle,
}: {
  toggle: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      className="relative z-50 flex h-12 w-12 select-none place-content-center place-items-center rounded-full bg-transparent"
      onClick={toggle}
    >
      <motion.svg width="23" height="23" viewBox="0 0 23 23">
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
};

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
          className="absolute flex flex-col gap-4 justify-start pt-24 p-6 w-[var(--sidebar-width)] right-0 bottom-16 top-0"
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

export function MenuSidebar() {
  const sidebarVariants: Variants = {
    open: {
      clipPath: `circle(1800px at 300px 40px)`,
      // bottom: "0px",
      inset: "0px",
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
      className="right-0 top-0 w-[--sidebar-width] bg-red-400 shadow-md dark:bg-red-800"
      variants={sidebarVariants}
    />
  );
}
