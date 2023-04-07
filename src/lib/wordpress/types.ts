import _WordpressPost from "./post";

export type WordpressImage = {
  sourceUrl: string;
  caption: string;
  altText: string;
  srcSet?: string;
  sizes?: string;
};

export type WordpressPostStatus = "draft" | "publish" | "revision";

export interface WordpressPost {
  databaseId: number;
  slug: string;
  title: string;
  date: string;
  modifiedDate: string;
  content: string;
  excerpt: string;
  featuredImage?: WordpressImage;
  status: WordpressPostStatus;
  readingTime: number;
  wordCount: number;
  _post?: _WordpressPost;
  render(transform: (content: string) => Promise<string>): Promise<string>;
  renderedContent: string;
}

export type WordpressResponse = {
  status: number;
  post: WordpressPost;
  error?: string;
};

export interface WordpressRestRenderedField {
  raw?: string;
  rendered: string;
}

export interface WordpressRestEntity {
  id: number;
  slug: string;
  acf: any[];
}

export interface WordpressRestMediaSize {
  file: string;
  width: number;
  height: number;
  virtual: boolean;
  mime_type: string;
  source_url: string;
}

export interface WordpressRestMedia extends WordpressRestEntity {
  date: string;
  title: WordpressRestRenderedField;
  caption: WordpressRestRenderedField;
  source_url: string;
  mime_type: string;
  media_type: "image" | "video";
  alt_text: string;
  media_details: {
    width: number;
    height: number;
    file: string;
    sizes: {
      [key: string]: WordpressRestMediaSize;
    };
    image_meta: {
      aperture: string;
      credit: string;
      camera: string;
      caption: string;
      created_timestamp: string;
      copyright: string;
      focal_length: string;
      iso: string;
      shutter_speed: string;
      title: string;
      orientation: string;
      keywords: [];
    };
  };
}

export interface WordpressRestTerm extends WordpressRestEntity {
  link: string;
  name: string;
  taxonomy: "category" | "post_tag";
}

export interface WordpressRestPost extends WordpressRestEntity {
  date: string;
  date_gmt: string;
  guid: WordpressRestRenderedField;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: WordpressPostStatus;
  type: "post";
  link: string;
  title: WordpressRestRenderedField;
  content: WordpressRestRenderedField;
  excerpt: WordpressRestRenderedField;
  author: number;
  featured_media: number;
  format: "standard" | "aside" | "link";
  meta: any[];
  categories: number[];
  tags: number[];
  word_count: number;
  reading_time: number;
  _rest?: boolean;
  _embedded: {
    "wp:featuredmedia"?: WordpressRestMedia[];
    "wp:term"?: WordpressRestTerm[][];
  };
}

export type WordpressRestClientOptions = {
  baseUrl?: string;
  basePath?: string;
};

export interface WordpressRestError {
  code: string;
  message: string;
  data: { status: number };
}

export interface WordpressRestResponse<Type = WordpressRestPost> {
  items: Type[];
  error?: WordpressRestError;
  posts?: WordpressPost[];
  totalItems: number;
  totalPages: number;
}

export type HttpMethod = "GET" | "POST";

export type Jsonable =
  | boolean
  | number
  | string
  | null
  | { [key: string]: Jsonable }
  | Array<Jsonable>;

export type ParamsInput = Record<string, string>;
export type BodyInput = Jsonable;
