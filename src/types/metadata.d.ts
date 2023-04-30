export interface Metadata {
  metadataBase?: null | URL;
  title?: string | TemplateString | null;
  description?: string | null;
  keywords?: null | string | Array<string>;
  colorScheme?: ColorSchemeEnum | null;

  /**
   * The icons for the document. Defaults to rel="icon".
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel#attr-icon
   * @example
   * ```tsx
   * "https://example.com/icon.png"
   * <link rel="icon" href="https://example.com/icon.png" />
   *
   * { icon: "https://example.com/icon.png", apple: "https://example.com/apple-icon.png" }
   * <link rel="icon" href="https://example.com/icon.png" />
   * <link rel="apple-touch-icon" href="https://example.com/apple-icon.png" />
   *
   * [{ rel: "icon", url: "https://example.com/icon.png" }, { rel: "apple-touch-icon", url: "https://example.com/apple-icon.png" }]
   * <link rel="icon" href="https://example.com/icon.png" />
   * <link rel="apple-touch-icon" href="https://example.com/apple-icon.png" />
   * ```
   */
  icons?: null | IconURL | Array<Icon> | Icons;

  /**
   * The canonical and alternate URLs for the document.
   * @example
   * ```tsx
   * { canonical: "https://example.com" }
   * <link rel="canonical" href="https://example.com" />
   *
   * { canonical: "https://example.com", hreflang: { "en-US": "https://example.com/en-US" } }
   * <link rel="canonical" href="https://example.com" />
   * <link rel="alternate" href="https://example.com/en-US" hreflang="en-US" />
   * ```
   *
   * Multiple titles example for alternate URLs except `canonical`:
   * ```tsx
   * {
   *   canonical: "https://example.com",
   *   types: {
   *     'application/rss+xml': [
   *       { url: 'blog.rss', title: 'rss' },
   *       { url: 'blog/js.rss', title: 'js title' },
   *     ],
   *   },
   * }
   * <link rel="canonical" href="https://example.com" />
   * <link rel="alternate" href="https://example.com/blog.rss" type="application/rss+xml" title="rss" />
   * <link rel="alternate" href="https://example.com/blog/js.rss" type="application/rss+xml" title="js title" />
   * ```
   */
  alternates?: null | AlternateURLs;

  openGraph?: null | OpenGraph;
  twitter?: null | Twitter;
}

export interface ResolvedMetadata {
  metadataBase: null | URL;
  title: AbsoluteTemplateString | null;
  description: string | null;
  keywords: null | Array<string>;
  colorScheme: ColorSchemeEnum | null;
  alternates: null | ResolvedAlternateURLs;

  // Defaults to rel="icon" but the Icons type can be used
  // to get more specific about rel types
  icons: null | ResolvedIcons;

  openGraph: null | ResolvedOpenGraph;
  twitter: null | ResolvedTwitterMetadata;
}

export type AlternateLinkDescriptor = {
  title?: string;
  url: string | URL;
};

export type AlternateURLs = {
  canonical?: null | string | URL | AlternateLinkDescriptor;
  languages?: Languages<null | string | URL | AlternateLinkDescriptor[]>;
  media?: {
    [media: string]: null | string | URL | AlternateLinkDescriptor[];
  };
  types?: {
    [types: string]: null | string | URL | AlternateLinkDescriptor[];
  };
};

export type ResolvedAlternateURLs = {
  canonical: null | AlternateLinkDescriptor;
  languages: null | Languages<AlternateLinkDescriptor[]>;
  media: null | {
    [media: string]: null | AlternateLinkDescriptor[];
  };
  types: null | {
    [types: string]: null | AlternateLinkDescriptor[];
  };
};

export type ColorSchemeEnum =
  | "normal"
  | "light"
  | "dark"
  | "light dark"
  | "dark light"
  | "only light";

export type TemplateString =
  | DefaultTemplateString
  | AbsoluteTemplateString
  | AbsoluteString;
export type DefaultTemplateString = {
  default: string;
  template: string;
};
export type AbsoluteTemplateString = {
  absolute: string;
  template: string | null;
};
export type AbsoluteString = {
  absolute: string;
};

export type FieldResolver<Key extends keyof Metadata> = (
  T: Metadata[Key]
) => ResolvedMetadata[Key];

export type FieldResolverWithMetadataBase<
  Key extends keyof Metadata,
  Options = undefined
> = Options extends undefined
  ? (
      T: Metadata[Key],
      metadataBase: ResolvedMetadata["metadataBase"]
    ) => ResolvedMetadata[Key]
  : (
      T: Metadata[Key],
      metadataBase: ResolvedMetadata["metadataBase"],
      options: Options
    ) => ResolvedMetadata[Key];

export type Twitter =
  | TwitterSummary
  | TwitterSummaryLargeImage
  | TwitterPlayer
  | TwitterApp
  | TwitterMetadata;

type TwitterMetadata = {
  // defaults to card="summary"
  site?: string; // username for account associated to the site itself
  siteId?: string; // id for account associated to the site itself
  creator?: string; // username for the account associated to the creator of the content on the site
  creatorId?: string; // id for the account associated to the creator of the content on the site
  description?: string;
  title?: string | TemplateString;
  images?: TwitterImage | Array<TwitterImage>;
};
type TwitterSummary = TwitterMetadata & {
  card: "summary";
};
type TwitterSummaryLargeImage = TwitterMetadata & {
  card: "summary_large_image";
};
type TwitterPlayer = TwitterMetadata & {
  card: "player";
  players: TwitterPlayerDescriptor | Array<TwitterPlayerDescriptor>;
};
type TwitterApp = TwitterMetadata & {
  card: "app";
  app: TwitterAppDescriptor;
};

export type TwitterAppDescriptor = {
  id: {
    iphone?: string | number;
    ipad?: string | number;
    googleplay?: string;
  };
  url?: {
    iphone?: string | URL;
    ipad?: string | URL;
    googleplay?: string | URL;
  };
  name?: string;
};

type TwitterImage = string | TwitterImageDescriptor | URL;
type TwitterImageDescriptor = {
  url: string | URL;
  alt?: string;
  secureUrl?: string | URL;
  type?: string;
  width?: string | number;
  height?: string | number;
};
type TwitterPlayerDescriptor = {
  playerUrl: string | URL;
  streamUrl: string | URL;
  width: number;
  height: number;
};

type ResolvedTwitterImage = {
  url: string | URL;
  alt?: string;
  secureUrl?: string | URL;
  type?: string;
  width?: string | number;
  height?: string | number;
};
type ResolvedTwitterSummary = {
  site: string | null;
  siteId: string | null;
  creator: string | null;
  creatorId: string | null;
  description: string | null;
  title: AbsoluteTemplateString;
  images?: Array<ResolvedTwitterImage>;
};
type ResolvedTwitterPlayer = ResolvedTwitterSummary & {
  players: Array<TwitterPlayerDescriptor>;
};
type ResolvedTwitterApp = ResolvedTwitterSummary & {
  app: TwitterAppDescriptor;
};

export type ResolvedTwitterMetadata =
  | ({ card: "summary" } & ResolvedTwitterSummary)
  | ({ card: "summary_large_image" } & ResolvedTwitterSummary)
  | ({ card: "player" } & ResolvedTwitterPlayer)
  | ({ card: "app" } & ResolvedTwitterApp);

export type OpenGraphType =
  | "article"
  | "book"
  | "music.song"
  | "music.album"
  | "music.playlist"
  | "music.radio_station"
  | "profile"
  | "website"
  | "video.tv_show"
  | "video.other"
  | "video.movie"
  | "video.episode";

export type OpenGraph =
  | OpenGraphWebsite
  | OpenGraphArticle
  | OpenGraphBook
  | OpenGraphProfile
  | OpenGraphMusicSong
  | OpenGraphMusicAlbum
  | OpenGraphMusicPlaylist
  | OpenGraphRadioStation
  | OpenGraphVideoMovie
  | OpenGraphVideoEpisode
  | OpenGraphVideoTVShow
  | OpenGraphVideoOther
  | OpenGraphMetadata;

// update this type to reflect actual locales
type Locale = string;

type OpenGraphMetadata = {
  determiner?: "a" | "an" | "the" | "auto" | "";
  title?: string | TemplateString;
  description?: string;
  emails?: string | Array<string>;
  phoneNumbers?: string | Array<string>;
  faxNumbers?: string | Array<string>;
  siteName?: string;
  locale?: Locale;
  alternateLocale?: Locale | Array<Locale>;
  images?: OGImage | Array<OGImage>;
  audio?: OGAudio | Array<OGAudio>;
  videos?: OGVideo | Array<OGVideo>;
  url?: string | URL;
  countryName?: string;
  ttl?: number;
};
type OpenGraphWebsite = OpenGraphMetadata & {
  type: "website";
};
type OpenGraphArticle = OpenGraphMetadata & {
  type: "article";
  publishedTime?: string; // datetime
  modifiedTime?: string; // datetime
  expirationTime?: string; // datetime
  authors?: null | string | URL | Array<string | URL>;
  section?: null | string;
  tags?: null | string | Array<string>;
};
type OpenGraphBook = OpenGraphMetadata & {
  type: "book";
  isbn?: null | string;
  releaseDate?: null | string; // datetime
  authors?: null | string | URL | Array<string | URL>;
  tags?: null | string | Array<string>;
};
type OpenGraphProfile = OpenGraphMetadata & {
  type: "profile";
  firstName?: null | string;
  lastName?: null | string;
  username?: null | string;
  gender?: null | string;
};
type OpenGraphMusicSong = OpenGraphMetadata & {
  type: "music.song";
  duration?: null | number;
  albums?: null | string | URL | OGAlbum | Array<string | URL | OGAlbum>;
  musicians?: null | string | URL | Array<string | URL>;
};
type OpenGraphMusicAlbum = OpenGraphMetadata & {
  type: "music.album";
  songs?: null | string | URL | OGSong | Array<string | URL | OGSong>;
  musicians?: null | string | URL | Array<string | URL>;
  releaseDate?: null | string; // datetime
};
type OpenGraphMusicPlaylist = OpenGraphMetadata & {
  type: "music.playlist";
  songs?: null | string | URL | OGSong | Array<string | URL | OGSong>;
  creators?: null | string | URL | Array<string | URL>;
};
type OpenGraphRadioStation = OpenGraphMetadata & {
  type: "music.radio_station";
  creators?: null | string | URL | Array<string | URL>;
};
type OpenGraphVideoMovie = OpenGraphMetadata & {
  type: "video.movie";
  actors?: null | string | URL | OGActor | Array<string | URL | OGActor>;
  directors?: null | string | URL | Array<string | URL>;
  writers?: null | string | URL | Array<string | URL>;
  duration?: null | number;
  releaseDate?: null | string; // datetime
  tags?: null | string | Array<string>;
};
type OpenGraphVideoEpisode = OpenGraphMetadata & {
  type: "video.episode";
  actors?: null | string | URL | OGActor | Array<string | URL | OGActor>;
  directors?: null | string | URL | Array<string | URL>;
  writers?: null | string | URL | Array<string | URL>;
  duration?: null | number;
  releaseDate?: null | string; // datetime
  tags?: null | string | Array<string>;
  series?: null | string | URL;
};
type OpenGraphVideoTVShow = OpenGraphMetadata & {
  type: "video.tv_show";
};
type OpenGraphVideoOther = OpenGraphMetadata & {
  type: "video.other";
};

type OGImage = string | OGImageDescriptor | URL;
type OGImageDescriptor = {
  url: string | URL;
  secureUrl?: string | URL;
  alt?: string;
  type?: string;
  width?: string | number;
  height?: string | number;
};
type OGAudio = string | OGAudioDescriptor | URL;
type OGAudioDescriptor = {
  url: string | URL;
  secureUrl?: string | URL;
  type?: string;
};
type OGVideo = string | OGVideoDescriptor | URL;
type OGVideoDescriptor = {
  url: string | URL;
  secureUrl?: string | URL;
  type?: string;
  width?: string | number;
  height?: string | number;
};

export type ResolvedOpenGraph =
  | ResolvedOpenGraphWebsite
  | ResolvedOpenGraphArticle
  | ResolvedOpenGraphBook
  | ResolvedOpenGraphProfile
  | ResolvedOpenGraphMusicSong
  | ResolvedOpenGraphMusicAlbum
  | ResolvedOpenGraphMusicPlaylist
  | ResolvedOpenGraphRadioStation
  | ResolvedOpenGraphVideoMovie
  | ResolvedOpenGraphVideoEpisode
  | ResolvedOpenGraphVideoTVShow
  | ResolvedOpenGraphVideoOther
  | ResolvedOpenGraphMetadata;

type ResolvedOpenGraphMetadata = {
  determiner?: "a" | "an" | "the" | "auto" | "";
  title?: AbsoluteTemplateString;
  description?: string;
  emails?: Array<string>;
  phoneNumbers?: Array<string>;
  faxNumbers?: Array<string>;
  siteName?: string;
  locale?: Locale;
  alternateLocale?: Array<Locale>;
  images?: Array<OGImage>;
  audio?: Array<OGAudio>;
  videos?: Array<OGVideo>;
  url: null | URL | string;
  countryName?: string;
  ttl?: number;
};
type ResolvedOpenGraphWebsite = ResolvedOpenGraphMetadata & {
  type: "website";
};
type ResolvedOpenGraphArticle = ResolvedOpenGraphMetadata & {
  type: "article";
  publishedTime?: string; // datetime
  modifiedTime?: string; // datetime
  expirationTime?: string; // datetime
  authors?: Array<string>;
  section?: string;
  tags?: Array<string>;
};
type ResolvedOpenGraphBook = ResolvedOpenGraphMetadata & {
  type: "book";
  isbn?: string;
  releaseDate?: string; // datetime
  authors?: Array<string>;
  tags?: Array<string>;
};
type ResolvedOpenGraphProfile = ResolvedOpenGraphMetadata & {
  type: "profile";
  firstName?: string;
  lastName?: string;
  username?: string;
  gender?: string;
};
type ResolvedOpenGraphMusicSong = ResolvedOpenGraphMetadata & {
  type: "music.song";
  duration?: number;
  albums?: Array<OGAlbum>;
  musicians?: Array<string | URL>;
};
type ResolvedOpenGraphMusicAlbum = ResolvedOpenGraphMetadata & {
  type: "music.album";
  songs?: Array<string | URL | OGSong>;
  musicians?: Array<string | URL>;
  releaseDate?: string; // datetime
};
type ResolvedOpenGraphMusicPlaylist = ResolvedOpenGraphMetadata & {
  type: "music.playlist";
  songs?: Array<string | URL | OGSong>;
  creators?: Array<string | URL>;
};
type ResolvedOpenGraphRadioStation = ResolvedOpenGraphMetadata & {
  type: "music.radio_station";
  creators?: Array<string | URL>;
};
type ResolvedOpenGraphVideoMovie = ResolvedOpenGraphMetadata & {
  type: "video.movie";
  actors?: Array<string | URL | OGActor>;
  directors?: Array<string | URL>;
  writers?: Array<string | URL>;
  duration?: number;
  releaseDate?: string; // datetime
  tags?: Array<string>;
};
type ResolvedOpenGraphVideoEpisode = ResolvedOpenGraphMetadata & {
  type: "video.episode";
  actors?: Array<string | URL | OGActor>;
  directors?: Array<string | URL>;
  writers?: Array<string | URL>;
  duration?: number;
  releaseDate?: string; // datetime
  tags?: Array<string>;
  series?: string | URL;
};
type ResolvedOpenGraphVideoTVShow = ResolvedOpenGraphMetadata & {
  type: "video.tv_show";
};
type ResolvedOpenGraphVideoOther = ResolvedOpenGraphMetadata & {
  type: "video.other";
};

type OGSong = {
  url: string | URL;
  disc?: number;
  track?: number;
};
type OGAlbum = {
  url: string | URL;
  disc?: number;
  track?: number;
};
type OGActor = {
  url: string | URL;
  role?: string;
};

export type IconURL = string | URL;
export type Icon = IconURL | IconDescriptor;
export type IconDescriptor = {
  url: string | URL;
  type?: string;
  sizes?: string;
  /** defaults to rel="icon" unless superseded by Icons map */
  rel?: string;
  media?: string;
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/fetchPriority
   */
  fetchPriority?: "high" | "low" | "auto";
};

export type Icons = {
  /** rel="icon" */
  icon?: Icon | Icon[];
  /** rel="shortcut icon" */
  shortcut?: Icon | Icon[];
  /**
   * @see https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html
   * rel="apple-touch-icon"
   */
  apple?: Icon | Icon[];
  /** rel inferred from descriptor, defaults to "icon" */
  other?: IconDescriptor | IconDescriptor[];
};

export type ResolvedIcons = {
  icon: IconDescriptor[];
  apple: IconDescriptor[];
  shortcut?: IconDescriptor[];
  other?: IconDescriptor[];
};
