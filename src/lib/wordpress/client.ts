import { WordpressPost, WordpressRestPost } from "./types";

type HttpMethod = "GET" | "POST";

type Jsonable =
  | boolean
  | number
  | string
  | null
  | { [key: string]: Jsonable }
  | Array<Jsonable>;
type ParamsInput = Record<string, string>;
type BodyInput = Jsonable;

type WordpressRestClientOptions = {
  baseUrl?: string;
  basePath?: string;
};

interface WordpressRestError {
  code: string;
  message: string;
  data: { status: number };
}

interface WordpressRestResponse<Type = WordpressRestPost> {
  items: Type[];
  error?: WordpressRestError;
  posts?: WordpressPost[];
  totalItems: number;
  totalPages: number;
}

export class WordpressRestClient {
  private _baseUrl: string;

  constructor(opts: WordpressRestClientOptions = {}) {
    this._baseUrl =
      opts.baseUrl || process.env.WP_URL || "https://wp2.demaree.me";
  }

  get(pathname: string, params: ParamsInput = {}) {
    return this._request(pathname, "GET", { params });
  }

  post(pathname: string, body: BodyInput = {}) {
    return this._request(pathname, "POST", { body });
  }

  private _request(
    pathname: string,
    method: HttpMethod = "GET",
    {
      params,
      body: requestBody,
    }: {
      params?: ParamsInput;
      body?: BodyInput;
    } = {}
  ) {
    let url = this.getEndpointUrl(pathname);
    let body: null | string = null;

    if (method === "GET") {
      url = new URL(`${url.toString()}?${new URLSearchParams(params)}`);
    } else {
      body = JSON.stringify(requestBody);
    }

    const authString = this.getWpAuthString();

    const headers = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
    });

    if (authString) {
      headers.set("Authorization", `Basic ${authString}`);
    }

    return fetch(url, {
      method,
      body,
      headers,
      next: { revalidate: 1 },
    }).then(async (r) => {
      let _data = await r.json();

      const totalItems = Number(r.headers.get("X-WP-Total"));
      const totalPages = Number(r.headers.get("X-WP-TotalPages"));

      const response: WordpressRestResponse = {
        items: _data,
        totalItems,
        totalPages,
      };

      if (Array.isArray(_data)) {
        response.items = _data;
      } else if (_data.id) {
        response.items = [_data];
        response.totalItems = 1;
        response.totalPages = 1;
      } else if (_data.code && _data.message && _data.data) {
        // Handle errors
        response.error = _data;
      }

      return response;
    });
  }

  private getEndpointUrl(pathname: string) {
    return new URL(pathname, this._baseUrl);
  }

  private getWpAuthString() {
    const username = process.env["WP_USER"];
    const password = process.env["WP_PASSWORD"];

    if (!username || !password) {
      return null;
    }

    const authString = Buffer.from(username + ":" + password).toString(
      "base64"
    );

    return authString;
  }
}

const _defaultClient = new WordpressRestClient();
export default _defaultClient;
