import { blogPostUrl } from "@/utils";
import { DateTime } from "luxon";
import { WordpressPost, WordpressRestPost } from "./types";
import { decode } from "html-entities";

export default class _WordpressPost implements WordpressPost {
  private __post: WordpressRestPost;
  private _renderedContent: string;

  constructor(post: WordpressRestPost) {
    this.__post = post;
    this._renderedContent = "";
  }

  get _post() {
    return this;
  }

  get id() {
    return this.__post.id;
  }

  get slug() {
    return this.__post.slug;
  }

  get title() {
    return (
      (this.__post.title.raw as string) ||
      decode(this.__post.title.rendered as string) ||
      ""
    );
  }

  get content() {
    return this.__post.content.rendered;
  }

  get excerpt() {
    return (this.__post.excerpt.raw as string) || "";
  }

  get date() {
    return this.__post.date_gmt;
  }

  get modifiedDate() {
    return this.__post.modified_gmt;
  }

  get status() {
    return this.__post.status;
  }

  get wordCount() {
    return this.__post.word_count;
  }

  get readingTime() {
    return this.__post.reading_time;
  }

  get databaseId() {
    return this.__post.id;
  }

  private _dateTime: DateTime;
  get dateTime() {
    if (!this._dateTime) {
      this._dateTime = DateTime.fromISO(this.date);
    }
    return this._dateTime;
  }

  private _modifiedDateTime: DateTime;
  get modifiedDateTime() {
    if (!this._modifiedDateTime) {
      this._modifiedDateTime = DateTime.fromISO(this.modifiedDate);
    }
    return this._modifiedDateTime;
  }

  get jsDate() {
    return this.dateTime.toJSDate();
  }

  get url() {
    return blogPostUrl(this.slug);
  }

  get canonicalUrl() {
    return blogPostUrl(this.slug, true);
  }

  private _firstImage: string;
  get featuredImageURL() {
    const featuredImage = this.getFeaturedImage();
    if (featuredImage) {
      return featuredImage.source_url;
    }

    if (!this._firstImage) {
      const img = this.content.match(/<img.*?src="(.*?)"/);
      if (img) {
        this._firstImage = img[1];
      }
    }

    return this._firstImage;
  }

  toFeedItem() {
    return {
      title: this.title,
      id: this.url,
      link: this.url,
      description: this.excerpt,
      content: this.content,
    };
  }

  async render(transform: (content: string) => Promise<string>) {
    const out: string = await transform(this.content);
    if (out) {
      this._renderedContent = out;
    }
    return this._renderedContent;
  }

  get renderedContent() {
    return this._renderedContent;
  }

  private getFeaturedImage() {
    if (this.__post._embedded["wp:featuredmedia"]) {
      return this.__post._embedded["wp:featuredmedia"][0];
    }
    return null;
  }
}
