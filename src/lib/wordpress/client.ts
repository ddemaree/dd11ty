import { WordpressPost, WordpressRestEntity, WordpressRestPost } from "./types";

type HttpMethod = "GET" | "POST";

type WordpressRestClientOptions = {
  baseUrl?: string;
  basePath?: string;
};

interface WordpressRestResponse<Type = WordpressRestPost> {
  items: Type[];
  posts?: WordpressPost[];
  totalItems: number;
  totalPages: number;
}

export class WordpressRestClient {
  private _baseUrl: string;

  constructor(opts: WordpressRestClientOptions = {}) {
    this._baseUrl = opts.baseUrl || "https://wp2.demaree.me";
  }

  get(pathname: string) {
    return this._request(pathname, "GET");
  }

  post(pathname: string) {
    return this._request(pathname, "POST");
  }

  private _request(pathname: string, method: HttpMethod = "GET") {
    const url = this.getEndpointUrl(pathname).toString();
    return fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (r) => {
      const items = await r.json();
      const totalItems = Number(r.headers.get("X-WP-Total"));
      const totalPages = Number(r.headers.get("X-WP-TotalPages"));

      const response: WordpressRestResponse = {
        items,
        totalItems,
        totalPages,
      };

      return response;
    });
  }

  private getEndpointUrl(pathname: string) {
    return new URL(pathname, this._baseUrl);
  }
}

const _defaultClient = new WordpressRestClient();
export default _defaultClient;
