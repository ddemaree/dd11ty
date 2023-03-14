import type { WordpressRestPost } from "./types";
import client from "./client";
import wrapPost from "./wrapPost";

export default function getAllPosts() {
  const params = new URLSearchParams({ _embed: "true" });
  return client
    .get(`/wp-json/wp/v2/posts?${params}`)
    .then((p: WordpressRestPost[]) => p.map(wrapPost));
}
