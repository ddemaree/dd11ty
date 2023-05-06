import { menuItems } from "../SiteMenu";
import DDIcon from "../DDIcon";
import { NavItem } from "../SiteMenu/NavItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
// import styles from "./SiteHeader.module.css";

const activeSection = null;

// clsx(
//   styles.wrapper,
//   "site-header h-16 w-full max-w-6xl self-center justify-self-center rounded-full border-b border-dd-text/20 bg-red-500 px-8 text-lg/none text-white shadow-md lg:mt-8"
// )

function SiteHeader() {
  return (
    <header
      id="nav-parent"
      className="grid grid-cols-[auto_1fr_auto] min-[990px]:grid-cols-[1fr_720px_1fr] items-center gap-6 px-6 md:px-8 h-[72px] w-full font-[degular-variable] [font-variation-settings:'wght'_650] text-xl/none"
    >
      <div className="contents">
        <a href="/" className=" justify-self-center">
          <DDIcon size="1.75em" />
        </a>


        <nav className="hidden gap-[1em] sm:flex">
          <ul className="contents">
            {menuItems.main.map((item, index) => (
              <NavItem
                key={index}
                itemClassName="contents"
                item={item}
                isActive={activeSection === item.slug}
              />
            ))}
          </ul>
        </nav>

        <nav className=" flex justify-end gap-[1em]">
          <ul className="contents">
            {menuItems.social.map((item, index) => (
              <li key={index}>
                <a href={item.href}>
                  <FontAwesomeIcon icon={item.icon as IconProp} />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default SiteHeader;
