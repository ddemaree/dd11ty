import DisplayDate from "@components/DisplayDate";
import "./PostHeader.scss";

export default function PostHeader({
  title,
  subtitle,
  date,
}: {
  title: string;
  subtitle?: string;
  date: string;
}) {
  return (
    <header className="post-header">
      <div className="post-header-inner @container/post-header">
        <h1
          className="post-header__title text-stone-900 dark:text-white"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        {subtitle && (
          <div
            className="post-header__subtitle"
            dangerouslySetInnerHTML={{ __html: subtitle }}
          />
        )}
        {date && (
          <div className="post-header__dateline">
            <DisplayDate dateString={date} />
          </div>
        )}
      </div>
    </header>
  );
}
