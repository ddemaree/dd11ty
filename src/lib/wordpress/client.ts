type HttpMethod = "GET" | "POST";

type WordpressRestClientOptions = {
  baseUrl?: string;
  basePath?: string;
};

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
    }).then((r) => r.json());
  }

  private getEndpointUrl(pathname: string) {
    return new URL(pathname, this._baseUrl);
  }
}

const _defaultClient = new WordpressRestClient();
export default _defaultClient;
