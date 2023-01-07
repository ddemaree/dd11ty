import getSiteUrl from "@lib/getSiteUrl";
import { isDevelopment } from "@lib/siteUtils";

interface TitleSocialImageProps {
  title?: string;
  slug?: string;
}

export function getSocialImageURL({ title, slug }: TitleSocialImageProps) {
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

  return socialImageUrl;
}

export default function SocialImageTags({
  title = "",
  slug = "",
}: TitleSocialImageProps) {
  const socialImageUrl = getSocialImageURL({ title, slug });

  return <>{getSocialImageTags({ title, slug })}</>;
}

export function getSocialImageData({ title, slug }: TitleSocialImageProps) {
  const content = getSocialImageURL({ title, slug });
  return [
    { name: "twitter:card", content: "summary_large_image" },
    { property: "og:image", content },
    { name: "twitter:image", content },
  ];
}

export function getSocialImageTags({ title, slug }: TitleSocialImageProps) {
  return getSocialImageData({ title, slug }).map((c, x) => (
    <meta key={x} {...c} />
  ));
}
