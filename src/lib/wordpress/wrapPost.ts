import _WordpressPost from "./post";
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
    return value.raw as string;
  }

  return value.rendered;
}

export default function wrapPost(
  inputPostData: WordpressRestPost
): WordpressPost {
  let { slug, title, content, date, excerpt, status, _embedded, ...postData } =
    inputPostData;

  const inputImage = _embedded && _embedded["wp:featuredmedia"]?.at(0);
  let featuredImage: WordpressImage | undefined = undefined;

  if (inputImage) {
    featuredImage = {
      sourceUrl: inputImage.source_url,
      caption: unwrapField(inputImage.caption),
      altText: inputImage.alt_text,
    };
  }

  const postInstance = new _WordpressPost(inputPostData);
  return postInstance;
}
