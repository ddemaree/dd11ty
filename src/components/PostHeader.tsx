import { fill } from "@cloudinary/url-gen/actions/resize";
import DisplayDate from "@components/DisplayDate";
import cloudinary from "@lib/cloudinary";
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
  let bannerImgUrl: string = "";
  if (featuredImage) {
    const clImg = cloudinary.image(featuredImage?.cloudinaryId);
    bannerImgUrl = clImg.resize(fill(1200, 900).gravity("auto")).toURL();
  }

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
        <figure className="post-featured-image w-full max-w-wide mt-10">
          <Image
            width={1200}
            height={900}
            src={bannerImgUrl}
            alt={featuredImage.altText}
            className="h-full w-full object-cover"
            priority={true}
          />
        </figure>
      )}
    </header>
  );
}
