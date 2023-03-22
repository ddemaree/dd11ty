import { WordpressRestError } from "./types";

export default class WordpressError extends Error {
  private _errorData: WordpressRestError;

  constructor(
    messageOrData: WordpressRestError | string,
    errorData?: WordpressRestError
  ) {
    if (typeof messageOrData === "string") {
      super(`WordPress REST error: ${messageOrData}`);

      if (errorData && errorData.hasOwnProperty("code")) {
        this._errorData = errorData;
      } else {
        this._errorData = {
          message: messageOrData,
          code: "unknown_error",
          data: { status: 567 },
        };
      }
    } else {
      super(messageOrData.message);
      this._errorData = messageOrData;
    }
  }

  get name() {
    return "WordPress REST error";
  }

  get errorStatus() {
    return this._errorData.data.status;
  }

  toString() {
    let _outMessage = this.message;
    _outMessage.replace(/<strong>.+<\/strong> /, "");
    return _outMessage;
  }
}
