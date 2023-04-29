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

type LinkProps = Omit<
  PropsWithChildren<HTMLAttributes<HTMLAnchorElement>>,
  "href"
> & {
  page: BlogPage;
  previous?: boolean;
  next?: boolean;
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

function Link({
  page,
  previous: isPrevious,
  next: isNext,
  children,
  ...props
}: LinkProps) {
  if (!page.url.prev && isPrevious) {
    return <span className="prev-placeholder"></span>;
  }
  if (!page.url.next && isNext) {
    return <span className="next-placeholder"></span>;
  }

  return <a {...props}>{children}</a>;
}

export const Pagination = {
  Wrapper,
  Link,
};

export function createPagination(page: BlogPage) {
  return {
    Wrapper: (props: Omit<PaginationProps, "page">) => (
      <Wrapper {...props} page={page} />
    ),
    Link: (props: Omit<LinkProps, "page">) => <Link {...props} page={page} />,
    PrevIcon,
    NextIcon,
  };
}
