import type {
  WordpressImage,
  WordpressPost,
  WordpressRestPost,
  WordpressRestRenderedField,
} from "./types";

function unwrapField(
  value: WordpressRestRenderedField | string,
  returnRaw: boolean = false
): string {
  if (!value) return "";
  if (typeof value === "string") return value;

  if (value.hasOwnProperty("raw") && returnRaw) {
    return value.raw;
  }

  return value.rendered;
}

export default function wrapPost(
  inputPostData: WordpressRestPost
): WordpressPost {
  let { slug, title, content, date, excerpt, _embedded, ...postData } =
    inputPostData;

  const inputImage = _embedded["wp:featuredmedia"]?.at(0);
  let featuredImage: WordpressImage;
  if (inputImage) {
    featuredImage = {
      sourceUrl: inputImage.source_url,
      caption: unwrapField(inputImage.caption),
      altText: inputImage.alt_text,
    };
  }

  const post: WordpressPost = {
    slug,
    date: postData.date_gmt,
    title: unwrapField(title, true),
    content: unwrapField(content),
    excerpt: unwrapField(excerpt, true),
    featuredImage,
  };

  return post;
}
