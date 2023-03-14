import type { WordpressRestPost } from "./types";
import wrapPost from "./wrapPost";
import client from "./client";

export default function getSinglePost(slug: string) {
  const params = new URLSearchParams({ slug, _embed: "true" });
  return client
    .get(`/wp-json/wp/v2/posts?${params}`)
    .then((p: WordpressRestPost[]) => p.map(wrapPost))
    .then((pp) => pp.at(0));
}
