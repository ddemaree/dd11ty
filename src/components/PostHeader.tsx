import DisplayDate from "@components/DisplayDate";
import { WordpressImage } from "@lib/wordpress";
import clsx from "clsx";
import Image from "next/image";
import styles from "./PostHeader.module.scss";

export default function PostHeader({
  title,
  subtitle,
  date,
  image: featuredImage,
}: {
  title: string;
  subtitle?: string;
  date: string;
  image?: WordpressImage;
}) {
  return (
    <header className={styles.postHeader}>
      <div className={clsx(styles.inner, "@container/post-header")}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {date && (
          <div className={styles.dateline}>
            <DisplayDate dateString={date} />
          </div>
        )}
      </div>
      {featuredImage && (
        <figure className="post-featured-image mt-10">
          <Image
            width={1000}
            height={562}
            src={featuredImage.sourceUrl}
            alt={featuredImage.altText}
            className="h-full w-full object-cover"
          />
        </figure>
      )}
    </header>
  );
}
