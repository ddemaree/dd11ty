import DisplayDate from "@components/DisplayDate";
import { WordpressImage } from "@lib/wordpress";
import Image from "next/image";
import "./PostHeader.scss";

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
    <header className="post-header">
      <div className="post-header-inner @container/post-header">
        <h1 className="post-header__title text-stone-900 dark:text-white">
          {title}
        </h1>
        {subtitle && <p className="post-header__subtitle">{subtitle}</p>}
        {date && (
          <div className="post-header__dateline">
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
