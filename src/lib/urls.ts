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

type ImageUrlOptions = {
  width?: number;
  height?: number;
};

export function imageUrl(
  srcUrl: string,
  opts: ImageUrlOptions = { width: 300 }
) {
  const _url = new URL(srcUrl);
  opts = { width: 300, height: 240, ...opts };

  switch (_url.hostname) {
    case "img.demaree.me":
    case "ddwp.test":
      return srcUrl;

    case "images.unsplash.com":
      _url.searchParams.set("w", `${opts.width ? opts.width.toString() : 300}`);
      return _url.toString();

    default:
      return `https://img.demaree.me/fetch/w_${
        opts.width || 300
      },f_auto,q_auto/${srcUrl}`;
  }
}
