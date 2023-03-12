import { WordpressRestPost } from "../types";
import { WordpressRestClient } from "./client";
import wrapPost from "../wrapPost";

export class WordpressApi {
  private _client: WordpressRestClient;

  constructor() {
    this._client = new WordpressRestClient({ baseUrl: import.meta.env.WP_URL });
  }

  getAllPosts() {
    const params = new URLSearchParams({ _embed: "true" });
    return this._client
      .get(`/wp-json/wp/v2/posts?${params}`)
      .then((p: WordpressRestPost[]) => p.map(wrapPost));
  }

  getSinglePost(slug) {
    const params = new URLSearchParams({ slug, _embed: "true" });
    return this._client
      .get(`/wp-json/wp/v2/posts?${params}`)
      .then((p: WordpressRestPost[]) => p.map(wrapPost))
      .then((pp) => pp.at(0));
  }
}

const _wp = new WordpressApi();
export default _wp;
