import client from "./client";
import wrapPost from "./wrapPost";

export default async function getPage(slug: string) {
  return client
    .get(`/wp-json/wp/v2/pages`, {
      slug,
      _embed: "true",
      context: "edit",
    })
    .then(({ items }) => items.map(wrapPost))
    .then((pp) => pp.at(0));
}
