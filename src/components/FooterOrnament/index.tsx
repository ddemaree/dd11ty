import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDDLogo } from "@lib/icons";
import clsx from "clsx";

import styles from "./styles.module.css";

export default function FooterOrnament() {
  return (
    <div className={clsx(styles.endOrnament, "max-w-content")}>
      <FontAwesomeIcon icon={faDDLogo} />
    </div>
  );
}
