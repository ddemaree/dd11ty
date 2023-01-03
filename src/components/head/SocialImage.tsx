import getSiteUrl from "@lib/getSiteUrl";
import { isDevelopment } from "@lib/siteUtils";

interface TitleSocialImageProps {
  title?: string;
  slug?: string;
}

export default function SocialImageTags({
  title = "",
  slug = "",
}: TitleSocialImageProps) {
  const urlHost = getSiteUrl();
  const urlProtocol = isDevelopment() ? "http" : "https";
  const urlBase = `${urlProtocol}://${urlHost}`;
  let socialImageUrl;

  if (slug) {
    socialImageUrl = `${urlBase}/api/post-image/${slug}.png`;
  } else if (title) {
    socialImageUrl = `${urlBase}/api/og-image?title=${encodeURIComponent(
      title.replace(/ /g, "_").replace(/'/g, "%27")
    )}`;
  } else {
    // If no title or slug, use the generic DD image
    socialImageUrl = `${urlBase}/api/og-image`;
  }

  return (
    <>
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:image" content={socialImageUrl} />
      <meta name="twitter:image" content={socialImageUrl} />
    </>
  );
}
