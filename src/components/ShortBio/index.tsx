import clsx from "clsx";
import Content from "./text.mdx";
import styles from "./styles.module.scss";

export default function ShortBio({ className = "" }) {
  const classValue = clsx(styles.default, className);
  return (
    <div className={classValue}>
      <Content />
    </div>
  );
}
