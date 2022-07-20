import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDdLogo } from "./icons/faDdLogo";
import { faSquare } from "@fortawesome/free-solid-svg-icons";

import styles from "./SiteHeader.module.css";
import ThemeSwitch from "./ThemeSwitch";
import BisonBurger from "./BisonBurger";
import classNames from "classnames";

export default function SiteHeader({ fullBleed }) {
  return (
    <header
      className={classNames([
        styles.header,
        fullBleed && styles.headerFullBleed,
      ])}
    >
      <Link href="/">
        <a className={styles.logo}>
          <span className="fa-layers" style={{ fontSize: "2.5rem" }}>
            <FontAwesomeIcon icon={faSquare} />
            <FontAwesomeIcon icon={faDdLogo} transform="shrink-6" inverse />
          </span>
          <span className="sr-only">David Demaree</span>
        </a>
      </Link>
      <nav className={styles.menu}>
        <div className={`contents`}>
          <ThemeSwitch />
          <BisonBurger />
        </div>
      </nav>
    </header>
  );
}
