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
}: {
  title: string;
  href: string;
  icon?: IconProp;
  itemClass?: ClassValue;
  linkClass?: ClassValue;
}) {
  const itemClassValue = clsx(itemClass);
  const linkClassValue = clsx("inline-flex items-center gap-1", linkClass);

  return (
    <li className={itemClassValue}>
      <Link href={href} className={linkClassValue}>
        {icon && <FontAwesomeIcon icon={icon} fixedWidth size="sm" />}
        <span>{title}</span>
      </Link>
    </li>
  );
}

export default function MyLinks() {
  return (
    <div className="text-center flex flex-wrap justify-center gap-2">
      <ul className="contents">
        <MyLinksItem
          title="david@demaree.me"
          href="mailto:david@demaree.me?subject=sup"
          icon={faPaperPlane}
          itemClass="grow w-full"
        />
        <MyLinksItem
          title="Twitter"
          href="https://twitter.com/ddemaree"
          icon={faTwitter}
        />
        <MyLinksItem
          title="Mastodon"
          href="https://me.dm/ddemaree"
          icon={faMastodon}
        />
        <MyLinksItem
          title="LinkedIn"
          href="https://linkedin.com/in/ddemaree"
          icon={faLinkedin}
        />
        <MyLinksItem
          title="GitHub"
          href="https://github.com/ddemaree"
          icon={faGithub}
        />
        <MyLinksItem title="RSS" href="/feed" icon={faFeed} />
      </ul>
    </div>
  );
}
