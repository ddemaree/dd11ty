import path, { join } from "path";

export function getSiteEnvironment() {
  return process.env.VERCEL_ENV ?? process.env.NODE_ENV;
}

export function isDevelopment() {
  return getSiteEnvironment() === "development";
}

export function isProduction() {
  return getSiteEnvironment() === "production";
}

export function getPostPermalink(
  slugOrOptions:
    | string
    | { slug: string; absolute?: boolean; canonical?: boolean }
) {
  if (typeof slugOrOptions === "string") {
    slugOrOptions = { slug: slugOrOptions };
  }

  const { slug, absolute, canonical } = slugOrOptions;
  const pathname = `/post/${slug}`;

  // Return absolute URL that includes hostname
  // If canonical, always use the production domain
  if (absolute || canonical) {
    return join(getSiteHostname(canonical), pathname);
  }

  // Otherwise just return the relative path
  return pathname;
}

export function getSiteHostname(forceProduction: boolean = false) {
  if (forceProduction || isProduction()) {
    // Seems like Vercel's environment ought to be able to provide this but whatever
    return "demaree.me";
  }

  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_VERCEL_URL ??
    "localhost:3000"
  );
}

const DEFAULT_SITE_URL_OPTIONS: {
  pathname?: string;
  forceProduction?: boolean;
} = {
  pathname: "/",
  forceProduction: false,
};

export function getSiteURL(
  options = DEFAULT_SITE_URL_OPTIONS,
  returnAsString = true
) {
  options = Object.assign({}, DEFAULT_SITE_URL_OPTIONS, options);
  const { pathname, forceProduction } = options;
  const hostname = getSiteHostname(forceProduction);
  const protocol = isDevelopment() ? "http" : "https";
  const url = new URL(pathname as string, `${protocol}://${hostname}`);
  return returnAsString ? url.toString() : url;
}

interface TitleSocialImageProps {
  title?: string;
  slug?: string;
}

export function getSocialImageURL({ title, slug }: TitleSocialImageProps = {}) {
  let pathname: string;

  if (slug) {
    pathname = `/api/post-image/${slug}.png`;
  } else if (title) {
    pathname = `/api/og-image?title=${encodeURIComponent(
      title.replace(/ /g, "_").replace(/'/g, "%27")
    )}`;
  } else {
    // If no title or slug, use the generic DD image
    pathname = `/api/og-image`;
  }

  return getSiteURL({ pathname });
}

export const SOCIAL_IMAGE_PARAMS = {
  width: 1200,
  height: 630,
};
