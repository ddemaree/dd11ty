import type { WordpressRestPost } from "./types";
import client from "./client";
import wrapPost from "./wrapPost";
import WordpressError from "./error";

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
      if (!res.items || !Array.isArray(res.items)) {
        throw new WordpressError("Type error???");
      }
      res.posts = res.items.map(wrapPost);
      return res;
    });
}
