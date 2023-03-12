import type { WordpressPost } from "./types";

interface WordpressRestRenderedField {
  raw?: string;
  rendered: string;
}

interface WordpressRestPost {
  id: number;
  date: string;
  date_gmt: string;
  guid: WordpressRestRenderedField;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: "publish" | "draft";
  type: "post";
  link: string;
  title: WordpressRestRenderedField;
  content: WordpressRestRenderedField;
  excerpt: WordpressRestRenderedField;
  author: number;
  featured_media: number;
  format: "standard" | "aside" | "link";
  meta: any[];
  categories: number[];
  tags: number[];
  acf: any[];
  _rest: boolean;
}

function unwrapField(
  value: WordpressRestRenderedField,
  returnRaw: boolean = false
) {
  if (value.raw && returnRaw) {
    return value.raw;
  }

  return value.rendered;
}

export default function wrapPost(
  inputPostData: WordpressRestPost
): WordpressPost {
  let { slug, title, content, date, excerpt, ...postData } = inputPostData;

  // const featuredImage = postData?.featuredImage?.node;

  const post: WordpressPost = {
    slug,
    date: postData.date_gmt,
    title: unwrapField(title, true),
    content: unwrapField(content),
    excerpt: unwrapField(excerpt, true),
    featuredImage: null,
  };

  return post;
}
