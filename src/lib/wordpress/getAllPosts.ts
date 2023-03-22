import type { WordpressRestPost } from "./types";
import client from "./client";
import wrapPost from "./wrapPost";

export type WordpressAllPostsOptions = {
  page?: number;
  limit?: number;
};

const defaultOptions: WordpressAllPostsOptions = {
  page: 1,
  limit: 10,
};

export default function getAllPosts(
  options: WordpressAllPostsOptions = defaultOptions
) {
  options = { ...defaultOptions, ...options };
  const { page, limit } = options;

  return client
    .get(`/wp-json/wp/v2/posts`, {
      _embed: "true",
      page: `${page}`,
      per_page: `${limit}`,
    })
    .then((res) => {
      res.posts = res.items.map(wrapPost);
      return res;
    });
}
