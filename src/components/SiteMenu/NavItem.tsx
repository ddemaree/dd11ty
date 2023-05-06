import _ from "lodash";
import clsx, { ClassValue } from "clsx";
import { IconLookup, parse } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { MenuItem } from "./menus";

type NavLinkProps = {
  item: MenuItem;
  isActive?: boolean | (() => boolean);
  activeClass?: ClassValue;
};

type NavItemProps = NavLinkProps & { itemClassName?: ClassValue };

export function NavItem({ itemClassName, ...props }: NavItemProps) {
  return (
    <li className={clsx(itemClassName)}>
      <BasicNavLink {...props} />
    </li>
  );
}

export function MobileNavItem({
  itemClassName = "text-4xl",
  ...props
}: NavItemProps) {
  return (
    <motion.li variants={navItemVariants} className={clsx(itemClassName)}>
      <BasicNavLink {...props} />
    </motion.li>
  );
}

export function BasicNavLink({
  item,
  isActive,
  activeClass = "scale-105",
}: NavLinkProps) {
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
          size="xs"
          className=" opacity-40"
        />
        <span className="font-semibold">{title}</span>
      </span>
    </a>
  );
}

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
