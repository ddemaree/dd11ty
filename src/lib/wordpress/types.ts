export type WordpressImage = {
  sourceUrl: string;
  caption: string;
  altText: string;
  srcSet?: string;
  sizes?: string;
};

export type WordpressPost = {
  slug: string;
  title: string;
  date: string;
  content: string;
  excerpt: string;
  featuredImage?: WordpressImage;
};

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
  status: "publish" | "draft";
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
  _rest?: boolean;
  _embedded: {
    "wp:featuredmedia"?: WordpressRestMedia[];
    "wp:term"?: WordpressRestTerm[][];
  };
}
