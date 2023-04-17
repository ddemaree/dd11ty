// import path from "../../../shared/lib/isomorphic/path";
import type {
  AlternateLinkDescriptor,
  FieldResolver,
  FieldResolverWithMetadataBase,
  Icon,
  IconDescriptor,
  Icons,
  Metadata,
  OpenGraph,
  OpenGraphType,
  ResolvedAlternateURLs,
  ResolvedMetadata,
  ResolvedOpenGraph,
  ResolvedTwitterMetadata,
  Twitter,
} from "@/types/metadata";
import path from "path";
import { resolveTitle } from "./resolveTitle";

export function createDefaultMetadata(): ResolvedMetadata {
  // const defaultMetadataBase =
  //   process.env.NODE_ENV === "production" && process.env.VERCEL_URL
  //     ? new URL(`https://${process.env.VERCEL_URL}`)
  //     : null;
  const defaultMetadataBase = null;

  return {
    // viewport: "width=device-width, initial-scale=1",
    metadataBase: defaultMetadataBase,
    title: null,
    description: null,
    colorScheme: null,
    alternates: null,
    openGraph: null,
    twitter: null,
    keywords: null,
    icons: null,
  };
}

export function resolveMetadata(...metadata: Metadata[]) {
  let resolvedMetadata = createDefaultMetadata();

  let titleTemplates: {
    title: string | null;
    twitter: string | null;
    openGraph: string | null;
  } = {
    title: null,
    twitter: null,
    openGraph: null,
  };

  for (const meta of metadata) {
    mergeMetadata({ source: meta, target: resolvedMetadata, titleTemplates });

    titleTemplates = {
      title: resolvedMetadata.title?.template || null,
      openGraph: resolvedMetadata.openGraph?.title?.template || null,
      twitter: resolvedMetadata.twitter?.title?.template || null,
    };
  }

  return resolvedMetadata;
}

export function mergeMetadata({
  source,
  target,
  titleTemplates,
}: {
  source: Metadata | null;
  target: ResolvedMetadata | null;
  titleTemplates: {
    title: string | null;
    twitter: string | null;
    openGraph: string | null;
  };
}): ResolvedMetadata {
  if (!target) target = createDefaultMetadata();

  const options = {
    pathname: "/",
  };

  const metadataBase =
    typeof source?.metadataBase !== "undefined"
      ? source.metadataBase
      : target.metadataBase;

  for (const key_ in source) {
    const key = key_ as keyof Metadata;

    switch (key) {
      case "title": {
        target.title = resolveTitle(source.title, titleTemplates.title);
        break;
      }
      case "alternates": {
        target.alternates = resolveAlternates(source.alternates, metadataBase, {
          pathname: options.pathname,
        });
        break;
      }
      case "openGraph": {
        target.openGraph = resolveOpenGraph(source.openGraph, metadataBase);
        if (target.openGraph) {
          target.openGraph.title = resolveTitle(
            target.openGraph.title,
            titleTemplates.openGraph
          );
        }
        break;
      }
      case "twitter": {
        target.twitter = resolveTwitter(source.twitter, metadataBase);
        if (target.twitter) {
          target.twitter.title = resolveTitle(
            target.twitter.title,
            titleTemplates.twitter
          );
        }
        break;
      }
      // case "archives":
      // case "assets":
      // case "bookmarks":
      // case "authors":
      case "keywords": {
        // FIXME: type inferring
        // @ts-ignore
        target[key] = resolveAsArrayOrUndefined(source[key]) || null;
        break;
      }
      case "icons": {
        target.icons = resolveIcons(source.icons);
        break;
      }
      // directly assign fields that fallback to null
      case "description":
      case "colorScheme":
        // case "applicationName":
        // case "generator":
        // case "creator":
        // case "publisher":
        // case "category":
        // case "classification":
        // case "referrer":
        // case "itunes":
        // case "formatDetection":
        // case "manifest":
        // @ts-ignore TODO: support inferring
        target[key] = source[key] || null;
        break;
      case "metadataBase":
        target.metadataBase = metadataBase;
        break;
      default:
        break;
    }
  }

  return target;
}

function isStringOrURL(icon: any): icon is string | URL {
  return typeof icon === "string" || icon instanceof URL;
}

function resolveUrl(url: null | undefined, metadataBase: URL | null): null;
function resolveUrl(url: string | URL, metadataBase: URL | null): URL;
function resolveUrl(
  url: string | URL | null | undefined,
  metadataBase: URL | null
): URL | null;
function resolveUrl(
  url: string | URL | null | undefined,
  metadataBase: URL | null
): URL | null {
  if (url instanceof URL) return url;
  if (!url) return null;

  try {
    // If we can construct a URL instance from url, ignore metadataBase
    const parsedUrl = new URL(url);
    return parsedUrl;
  } catch (_) {}

  if (!metadataBase) {
    metadataBase = new URL(`http://localhost:${process.env.PORT || 3000}`);
  }

  // Handle relative or absolute paths
  const basePath = metadataBase.pathname || "";
  const joinedPath = path.join(basePath, url);

  return new URL(joinedPath, metadataBase);
}

export { isStringOrURL, resolveUrl };

// Resolve with `metadataBase` if it's present, otherwise resolve with `pathname`.
// Resolve with `pathname` if `url` is a relative path.
function resolveAlternateUrl(
  url: string | URL,
  metadataBase: URL | null,
  pathname: string
) {
  if (typeof url === "string" && url.startsWith("./")) {
    url = path.resolve(pathname, url);
  } else if (url instanceof URL) {
    url = new URL(pathname, url);
  }

  const result = metadataBase ? resolveUrl(url, metadataBase) : url;
  return result.toString();
}

function resolveUrlValuesOfObject(
  obj:
    | Record<string, string | URL | AlternateLinkDescriptor[] | null>
    | null
    | undefined,
  metadataBase: ResolvedMetadata["metadataBase"],
  pathname: string
): null | Record<string, AlternateLinkDescriptor[]> {
  if (!obj) return null;

  const result: Record<string, AlternateLinkDescriptor[]> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string" || value instanceof URL) {
      result[key] = [
        {
          url: resolveAlternateUrl(value, metadataBase, pathname), // metadataBase ? resolveUrl(value, metadataBase)! : value,
        },
      ];
    } else {
      result[key] = [];
      value?.forEach((item, index) => {
        const url = resolveAlternateUrl(item.url, metadataBase, pathname);
        result[key][index] = {
          url,
          title: item.title,
        };
      });
    }
  }
  return result;
}

export const resolveAlternates: FieldResolverWithMetadataBase<
  "alternates",
  { pathname: string }
> = (alternates, metadataBase, { pathname }) => {
  if (!alternates) return null;

  const canonical = resolveCanonicalUrl(
    alternates.canonical,
    metadataBase,
    pathname
  );
  const languages = resolveUrlValuesOfObject(
    alternates.languages,
    metadataBase,
    pathname
  );
  const media = resolveUrlValuesOfObject(
    alternates.media,
    metadataBase,
    pathname
  );
  const types = resolveUrlValuesOfObject(
    alternates.types,
    metadataBase,
    pathname
  );

  const result: ResolvedAlternateURLs = {
    canonical,
    languages,
    media,
    types,
  };

  return result;
};

function resolveCanonicalUrl(
  urlOrDescriptor: string | URL | null | AlternateLinkDescriptor | undefined,
  metadataBase: URL | null,
  pathname: string
): null | AlternateLinkDescriptor {
  if (!urlOrDescriptor) return null;

  const url =
    typeof urlOrDescriptor === "string" || urlOrDescriptor instanceof URL
      ? urlOrDescriptor
      : urlOrDescriptor.url;

  // Return string url because structureClone can't handle URL instance
  return {
    url: resolveAlternateUrl(url, metadataBase, pathname),
  };
}

function resolveArray<T>(value: T): T[] {
  if (Array.isArray(value)) {
    return value;
  }
  return [value];
}

function resolveAsArrayOrUndefined<T extends unknown | readonly unknown[]>(
  value: T | T[] | undefined | null
): undefined | T[] {
  if (typeof value === "undefined" || value === null) {
    return undefined;
  }
  if (Array.isArray(value)) {
    return value;
  }
  return [value];
}

export { resolveAsArrayOrUndefined, resolveArray };

const OgTypeFields = {
  article: ["authors", "tags"],
  song: ["albums", "musicians"],
  playlist: ["albums", "musicians"],
  radio: ["creators"],
  video: ["actors", "directors", "writers", "tags"],
  basic: [
    "emails",
    "phoneNumbers",
    "faxNumbers",
    "alternateLocale",
    "audio",
    "videos",
  ],
} as const;

function resolveImages(
  images: Twitter["images"],
  metadataBase: ResolvedMetadata["metadataBase"]
): NonNullable<ResolvedMetadata["twitter"]>["images"];
function resolveImages(
  images: OpenGraph["images"],
  metadataBase: ResolvedMetadata["metadataBase"]
): NonNullable<ResolvedMetadata["openGraph"]>["images"];
function resolveImages(
  images: OpenGraph["images"] | Twitter["images"],
  metadataBase: ResolvedMetadata["metadataBase"]
):
  | NonNullable<ResolvedMetadata["twitter"]>["images"]
  | NonNullable<ResolvedMetadata["openGraph"]>["images"] {
  const resolvedImages = resolveAsArrayOrUndefined(images);
  resolvedImages?.forEach((item, index, array) => {
    if (isStringOrURL(item)) {
      array[index] = {
        url: resolveUrl(item, metadataBase)!,
      };
    } else {
      // Update image descriptor url
      item.url = resolveUrl(item.url, metadataBase)!;
    }
  });
  return resolvedImages;
}

function getFieldsByOgType(ogType: OpenGraphType | undefined) {
  switch (ogType) {
    case "article":
    case "book":
      return OgTypeFields.article;
    case "music.song":
    case "music.album":
      return OgTypeFields.song;
    case "music.playlist":
      return OgTypeFields.playlist;
    case "music.radio_station":
      return OgTypeFields.radio;
    case "video.movie":
    case "video.episode":
      return OgTypeFields.video;
    default:
      return OgTypeFields.basic;
  }
}

export const resolveOpenGraph: FieldResolverWithMetadataBase<"openGraph"> = (
  openGraph: Metadata["openGraph"],
  metadataBase: ResolvedMetadata["metadataBase"]
) => {
  if (!openGraph) return null;

  const url = resolveUrl(openGraph.url, metadataBase);
  const resolved = { ...openGraph } as ResolvedOpenGraph;

  function assignProps(og: OpenGraph) {
    const ogType = og && "type" in og ? og.type : undefined;
    const keys = getFieldsByOgType(ogType);
    for (const k of keys) {
      const key = k as keyof ResolvedOpenGraph;
      if (key in og && key !== "url") {
        const value = og[key];
        if (value) {
          const arrayValue = resolveAsArrayOrUndefined(value);
          /// TODO: improve typing inferring
          (resolved as any)[key] = arrayValue;
        }
      }
    }

    resolved.images = resolveImages(og.images, metadataBase);
  }

  assignProps(openGraph);

  resolved.url = url;

  return resolved;
};

const TwitterBasicInfoKeys = [
  "site",
  "siteId",
  "creator",
  "creatorId",
  "description",
] as const;

export const resolveTwitter: FieldResolverWithMetadataBase<"twitter"> = (
  twitter,
  metadataBase
) => {
  if (!twitter) return null;
  const resolved = {
    ...twitter,
    card: "card" in twitter ? twitter.card : "summary",
  } as ResolvedTwitterMetadata;
  for (const infoKey of TwitterBasicInfoKeys) {
    resolved[infoKey] = twitter[infoKey] || null;
  }
  resolved.images = resolveImages(twitter.images, metadataBase);

  if ("card" in resolved) {
    switch (resolved.card) {
      case "player": {
        resolved.players = resolveAsArrayOrUndefined(resolved.players) || [];
        break;
      }
      case "app": {
        resolved.app = resolved.app || {};
        break;
      }
      default:
        break;
    }
  }

  return resolved;
};

// import type { ResolvedMetadata } from "../types/metadata-interface";
// import type { Icon, IconDescriptor } from "../types/metadata-types";
// import type { FieldResolver } from "../types/resolvers";
// import { resolveAsArrayOrUndefined } from "../generate/utils";
// import { isStringOrURL } from "./resolve-url";
// import { IconKeys } from "../constants";
export const IconKeys: (keyof Icons)[] = ["icon", "shortcut", "apple", "other"];

export function resolveIcon(icon: Icon): IconDescriptor {
  if (isStringOrURL(icon)) return { url: icon };
  else if (Array.isArray(icon)) return icon;
  return icon;
}

export const resolveIcons: FieldResolver<"icons"> = (icons) => {
  if (!icons) {
    return null;
  }

  const resolved: ResolvedMetadata["icons"] = {
    icon: [],
    apple: [],
  };
  if (Array.isArray(icons)) {
    resolved.icon = icons.map(resolveIcon).filter(Boolean);
  } else if (isStringOrURL(icons)) {
    resolved.icon = [resolveIcon(icons)];
  } else {
    for (const key of IconKeys) {
      const values = resolveAsArrayOrUndefined(icons[key]);
      if (values) resolved[key] = values.map(resolveIcon);
    }
  }
  return resolved;
};
