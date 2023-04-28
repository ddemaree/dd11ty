import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faGithub,
  faLinkedin,
  faMastodon,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeed, faPaperPlane } from "@fortawesome/sharp-solid-svg-icons";
import clsx, { ClassValue } from "clsx";
import Link from "next/link";

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
      <Link href={href} className={linkClassValue}>
        {icon && (
          <FontAwesomeIcon
            icon={icon}
            fixedWidth
            size={showLabel ? "sm" : "xl"}
          />
        )}
        <span className={clsx(!showLabel && "sr-only")}>{title}</span>
      </Link>
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
  variant = "default",
  showLabels = true,
}: {
  className?: ClassValue;
  variant?: null | MyLinksVariants;
  showLabels?: boolean;
}) {
  const classValue = clsx(variant && myVariants[variant], className);

  return (
    <div className={classValue}>
      <ul className="contents">
        {/* <MyLinksItem
          title="david@demaree.me"
          href="mailto:david@demaree.me?subject=sup"
          icon={faPaperPlane}
          showLabel={showLabels}
          // itemClass="grow w-full"
        /> */}
        <MyLinksItem
          title="Twitter"
          href="https://twitter.com/ddemaree"
          icon={faTwitter}
          showLabel={showLabels}
        />
        <MyLinksItem
          title="Mastodon"
          href="https://me.dm/@ddemaree"
          icon={faMastodon}
          showLabel={showLabels}
        />
        <MyLinksItem
          title="LinkedIn"
          href="https://linkedin.com/in/ddemaree"
          icon={faLinkedin}
          showLabel={showLabels}
        />
        <MyLinksItem
          title="GitHub"
          href="https://github.com/ddemaree"
          icon={faGithub}
          showLabel={showLabels}
        />
        <MyLinksItem
          title="RSS"
          href="/feed"
          icon={faFeed}
          showLabel={showLabels}
        />
      </ul>
    </div>
  );
}
