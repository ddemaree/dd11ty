import type { PropsWithChildren, HTMLAttributes } from "react";
import type { Page } from "astro";
import type { CollectionEntry } from "astro:content";
import clsx from "clsx";

import {
  FontAwesomeIcon,
  type FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/sharp-solid-svg-icons";

type BlogPage = Page<CollectionEntry<"blog">>;

type IconProps = FontAwesomeIconProps & {
  previous?: boolean;
  next?: boolean;
};

type PaginationProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {
  page: BlogPage;
};

type LinkProps = Omit<HTMLAttributes<HTMLAnchorElement>, "href"> & {
  page: BlogPage;
  rel: "prev" | "next" | "first" | "last";
};

const Icon = ({ icon, fixedWidth = true, ...props }: IconProps) => (
  <FontAwesomeIcon icon={icon} fixedWidth={fixedWidth} {...props} />
);

const PrevIcon = (props: Omit<IconProps, "icon">) => (
  <Icon icon={faChevronLeft} {...props} />
);

const NextIcon = (props: Omit<IconProps, "icon">) => (
  <Icon icon={faChevronRight} {...props} />
);

function Wrapper({ page, children, className, ...props }: PaginationProps) {
  className = clsx("flex justify-between items-center", className);

  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

function Link({ page, children, rel, ...props }: LinkProps) {
  const isPrevious = rel === "prev";
  const isNext = rel === "next";

  if (!page.url.prev && isPrevious) {
    return <span className="prev-placeholder"></span>;
  }
  if (!page.url.next && isNext) {
    return <span className="next-placeholder"></span>;
  }

  const href = (isPrevious && page.url.prev) || (isNext && page.url.next);
  if (!href) return null;

  return (
    <a href={href} rel={rel} {...props}>
      {children}
    </a>
  );
}

export const Pagination = {
  Wrapper,
  Link,
};

export function createPagination(page: BlogPage) {
  function Pagination({
    className,
    ...props
  }: Omit<HTMLAttributes<HTMLDivElement>, "role">) {
    if (page.url.prev === "/posts") {
      page.url.prev = "/";
    }

    return (
      <nav role="toolbar" className={clsx(className)} {...props}>
        <Link
          page={page}
          rel="prev"
          className="row h-12 gap-[0.35em] rounded-lg border border-dd-text/20 px-4 text-xl hover:border-dd-text/30 hover:bg-dd-text/10"
        >
          <PrevIcon size="sm" />
          <span>Previous</span>
        </Link>
        <Link
          page={page}
          rel="next"
          className="row h-12 gap-[0.35em] rounded-lg border border-dd-text/20 px-4 text-xl hover:border-dd-text/30 hover:bg-dd-text/10"
        >
          <NextIcon size="sm" className="sm:order-last" />
          <span>Next</span>
        </Link>
      </nav>
    );
  }

  return {
    Pagination,
    Wrapper: (props: Omit<PaginationProps, "page">) => (
      <Wrapper {...props} page={page} />
    ),
    Link: (props: Omit<LinkProps, "page">) => <Link {...props} page={page} />,
    PrevIcon,
    NextIcon,
  };
}
