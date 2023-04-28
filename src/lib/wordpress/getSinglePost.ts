import wrapPost from "./wrapPost";
import client from "./client";

export default function getSinglePost(slug: string) {
  return client
    .get(`/wp-json/wp/v2/posts`, {
      slug,
      _embed: "true",
      context: "edit",
    })
    .then(({ items }) => items.map(wrapPost))
    .then((pp) => pp.at(0));
}
