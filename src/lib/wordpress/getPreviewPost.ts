import wrapPost from "./wrapPost";
import client from "./client";

export default async function getPreviewPost(
  id: number | string,
  revision: number | string,
  baseUrl?: string
) {
  let uri: string = `/wp-json/wp/v2/posts/${id}`;

  if (revision) {
    uri += `/revisions/${revision}`;
  }

  console.log("Getting preview post with base url %s", baseUrl);

  return client
    .baseUrl(baseUrl)
    .get(uri, {
      _embed: "true",
      context: "edit",
      t: `${Date.now()}`,
    })
    .then(({ items }) => items.map(wrapPost))
    .then((pp) => pp.at(0));
}
