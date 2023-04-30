
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

export function ensureURL(src: URL | string) {
  return new URL(src);
}

export function isDataUri(src: URL | string) {
  src = ensureURL(src);
  return src.protocol === "data:";
}

const WP_PROD_DOMAINS = ["wp2.demaree.me", "wp.demaree.me", "demaree.me"];

export function isWPProdURL(srcUrl: URL | string) {
  srcUrl = ensureURL(srcUrl);
  return WP_PROD_DOMAINS.includes(srcUrl.hostname);
}

type ImageUrlOptions = {
  width?: number;
  height?: number;
};

/* 

imageURL(origSrcURL, {width: 1350, aspectRatio: 4/5, quality: 60})

imageSrcset(origSrcURL, {maxWidth: 1350, aspectRatio: 4/5})
*/

export function imageUrl(srcUrl: URL | string, opts: ImageUrlOptions = {}) {
  const _url = ensureURL(srcUrl);
  opts = { width: 300, height: 240, ...opts };

  switch (_url.hostname) {
    case "img.demaree.me":
    case "ddwp.test":
      return _url.toString();

    case "images.unsplash.com":
      _url.searchParams.set("w", `${opts.width ? opts.width.toString() : 300}`);
      return _url.toString();

    default:
      return `https://img.demaree.me/fetch/w_${
        opts.width || 300
      },f_auto,q_auto/${_url.toString()}`;
  }
}
