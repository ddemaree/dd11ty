import { merge } from "lodash";
import { NextSeoProps } from "next-seo";
import { getSocialImageURL, SOCIAL_IMAGE_PARAMS } from "./siteUtils";
import { WordpressPost } from "./wordpress";

export const DEFAULT_META: NextSeoProps = {
  defaultTitle: "demaree.me",
  titleTemplate: "%s • demaree.me",
  additionalLinkTags: [{ rel: "icon", href: "/dyn-icon.svg" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "demaree.me",
    images: [{ url: getSocialImageURL(), ...SOCIAL_IMAGE_PARAMS }],
  },
  twitter: {
    handle: "@ddemaree",
    site: "@ddemaree",
    cardType: "summary_large_image",
  },
};

export function postMeta(post: WordpressPost): NextSeoProps {
  return merge({}, DEFAULT_META, {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      images: [
        { url: getSocialImageURL({ slug: post.slug }), ...SOCIAL_IMAGE_PARAMS },
      ],
    },
  });
}
