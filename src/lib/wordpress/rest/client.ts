type HttpMethod = "GET" | "POST";

type WordpressRestClientOptions = {
  baseUrl?: string;
  basePath?: string;
};

export class WordpressRestClient {
  constructor(opts: WordpressRestClientOptions = {}) {
    this.baseUrl = opts.baseUrl;
    this.basePath = opts.basePath ?? "/wp-json/wp/v2";
  }

  private _basePath: string;
  public get basePath(): string {
    return this._basePath;
  }
  public set basePath(v: string) {
    this._basePath = v;
  }

  private _baseUrl: string;
  public get baseUrl(): string {
    return this._baseUrl;
  }
  public set baseUrl(v: string) {
    this._baseUrl = v;
  }

  // get baseUrl() {
  //   const _baseUrl = import.meta.env["WP_URL"];
  //   return `${_baseUrl}`;
  // }

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
    return new URL(pathname, this.baseUrl);
  }
}
