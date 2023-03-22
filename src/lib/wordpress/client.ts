import WordpressError from "./error";
import type {
  BodyInput,
  HttpMethod,
  ParamsInput,
  WordpressRestClientOptions,
  WordpressRestResponse,
  WordpressPost,
  WordpressRestPost,
} from "./types";

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
        items: [],
        totalItems,
        totalPages,
      };

      if (_data.code && _data.message) {
        // Handle errors
        // Add a default status code because sometimes WordPress omits it
        const statusCode = r.status > 200 ? r.status : 567;
        console.log(process.env);
        throw new WordpressError({ data: { status: statusCode }, ..._data });
      }

      if (Array.isArray(_data)) {
        response.items = _data;
      } else if (_data.id) {
        response.items = [_data];
        response.totalItems = 1;
        response.totalPages = 1;
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
