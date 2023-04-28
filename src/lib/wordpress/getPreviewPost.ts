import wrapPost from "./wrapPost";
import client from "./client";
import { WordpressRestPost } from "./types";
import { DateTime } from "luxon";

function _getPreviewEndpoint(id: number | string, revision: number | string) {
  let uri: string = `/wp-json/wp/v2/posts/${id}`;

  if (revision) {
    uri += `/revisions/${revision}`;
  }

  return uri;
}

export async function getPreviewModifiedTime(
  id: number | string,
  revision: number | string,
  baseUrl?: string
) {
  const uri: string = _getPreviewEndpoint(id, revision);

  return client
    .baseUrl(baseUrl)
    .get(uri, {
      _fields: "id,date_gmt,modified_gmt",
      context: "edit",
      t: `${Date.now()}`,
    })
    .then(({ items }) => items.at(0) as WordpressRestPost)
    .then((restPost) => restPost.modified_gmt)
    .then((modifiedGmtString) =>
      DateTime.fromISO(modifiedGmtString, { zone: "utc" })
    );
}

export async function getPreviewPost(
  id: number | string,
  revision: number | string,
  baseUrl?: string
) {
  const uri: string = _getPreviewEndpoint(id, revision);

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

export default getPreviewPost;
