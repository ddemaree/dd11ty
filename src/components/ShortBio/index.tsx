import clsx from "clsx";
import Content from "./text.mdx";
import styles from "./styles.module.scss";

type ShortBioProps = React.HTMLAttributes<HTMLDivElement>;

export default function ShortBio({ className = "", ...props }: ShortBioProps) {
  return (
    <div className={`${className}`.trim()} {...props}>
      <Content />
    </div>
  );
}
