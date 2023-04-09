"use client";

import { PropsWithChildren } from "react";

import { AnimatePresence, motion, Variants } from "framer-motion";

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

export default MenuItemsWrapper;
