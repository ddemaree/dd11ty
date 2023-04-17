import type { IconProp } from "@fortawesome/fontawesome-svg-core";

import {
  faGithub,
  faLinkedin,
  faMastodon,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faFeed } from "@fortawesome/sharp-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import clsx, { ClassValue } from "clsx";

type MyLink = {
  title: string;
  href: string;
  icon?: IconProp;
  hidden?: boolean;
};

export const myLinks = new Map<string, MyLink>([
  [
    "twitter",
    { title: "Twitter", href: "https://twitter.com/ddemaree", icon: faTwitter },
  ],
  [
    "mastodon",
    { title: "Mastodon", href: "https://me.dm/@ddemaree", icon: faMastodon },
  ],
  [
    "linkedin",
    {
      title: "LinkedIn",
      href: "https://linkedin.com/in/ddemaree",
      icon: faLinkedin,
    },
  ],
  [
    "github",
    { title: "GitHub", href: "https://github.com/ddemaree", icon: faGithub },
  ],
  ["rss", { title: "RSS", href: "/feed", icon: faFeed }],
]);

type MyLinksMap = typeof myLinks;

function MyLinksItem({
  title,
  href,
  icon,
  itemClass,
  linkClass,
  showLabel = true,
}: {
  title: string;
  href: string;
  icon?: IconProp;
  itemClass?: ClassValue;
  linkClass?: ClassValue;
  showLabel?: boolean;
}) {
  const itemClassValue = clsx(itemClass);
  const linkClassValue = clsx("inline-flex items-center gap-1", linkClass);

  return (
    <li className={itemClassValue}>
      <a href={href} className={linkClassValue}>
        {icon && (
          <FontAwesomeIcon
            icon={icon}
            fixedWidth
            size={showLabel ? "sm" : "xl"}
          />
        )}
        <span className={clsx(!showLabel && "sr-only")}>{title}</span>
      </a>
    </li>
  );
}

const myVariants = {
  default: "text-center flex flex-wrap justify-center gap-2",
  footer: "text-center flex flex-wrap justify-center gap-2",
  homepage: "flex flex-wrap gap-x-3 gap-y-2 text-2xl",
} as const;

type MyLinksVariants = keyof typeof myVariants;

export default function MyLinks({
  className,
  itemClassName,
  linkClassName,
  variant = "default",
  showLabels = true,
}: {
  className?: ClassValue;
  itemClassName?: ClassValue;
  linkClassName?: ClassValue;
  variant?: null | MyLinksVariants;
  showLabels?: boolean;
}) {
  const classValue = clsx(variant && myVariants[variant], className);

  return (
    <div className={classValue}>
      <ul className="contents">
        {[...myLinks.entries()].map(([key, link]) => (
          <MyLinksItem
            key={key}
            title={link.title}
            href={link.href}
            icon={link.icon}
            showLabel={showLabels}
            itemClass={itemClassName}
            linkClass={linkClassName}
          />
        ))}
      </ul>
    </div>
  );
}
