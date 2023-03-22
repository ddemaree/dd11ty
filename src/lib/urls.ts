export function siteUrl(path: string = "", canonical: boolean = false) {
  const hostname =
    process.env.NEXT_PUBLIC_VERCEL_URL ||
    process.env.VERCEL_URL ||
    ((process.env.NODE_ENV === "production" || canonical) && "demaree.me") ||
    "localhost:3000";

  const protocol = hostname.startsWith("localhost") ? "http://" : "https://";

  if (!path.startsWith("/")) path = `/${path}`;

  return `${protocol}${hostname}${path}`;
}

export function blogPostUrl(slug: string, canonical: boolean = false) {
  return siteUrl(`/post/${slug}`, canonical);
}
