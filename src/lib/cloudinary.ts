import { Cloudinary as CloudinaryUrl } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";

const cld = new CloudinaryUrl({
  cloud: {
    cloudName: "demaree",
  },
  url: {
    secure: true,
    analytics: false,
  },
});

export interface CloudinaryParams {
  cloudName: string;
  assetType: "image" | "video" | "raw";
  deliveryType: "upload" | "fetch";
  publicId: string;
  transformations?: "string";
  version?: string;
}

const ASSET_TYPES = {
  image: ["image", "images"],
  raw: ["raw", "files"],
  video: ["video", "videos"],
};

function isAssetType(type) {
  const allTypes = Object.values(ASSET_TYPES).flat();
  return !!allTypes.includes(type);
}

function getAssetType(urlType) {
  const _keys = Object.keys(ASSET_TYPES);
  return _keys.find(
    (k) => ASSET_TYPES[k] === urlType || ASSET_TYPES[k].includes(urlType)
  );
}

const DELIVERY_TYPES = ["upload", "fetch", "twitter_name"];

function isDeliveryType(urlType) {
  return DELIVERY_TYPES.includes(urlType);
}

function isTransformationString(urlPart) {
  return urlPart.match(/([a-z]+_[^\;,]+,?)+/);
}

function parseURL(urlString) {
  try {
    return new URL(urlString);
  } catch (error) {
    console.error(error);
    return;
  }
}

/* 
Generate a resized Cloudinary URL with the given public ID.

The public ID can be a URL (encoded or unencoded); if the deliveryType is set to fetch, that will generate a fetch URL. (Source assets need to be below 10 MB or else there will be errors.)
*/
export function resizeCloudinaryURL(
  publicId: string,
  deliveryType: "upload" | "fetch" = "upload",
  width: number = 400,
  height: number = 400
) {
  if (publicId.match(/^https%3A?/)) {
    // URL is already encoded, which means this is probably a fetch. Unescape it to avoid a double-escape error
    publicId = decodeURIComponent(publicId);
  }

  const img = cld
    .image(publicId)
    .setDeliveryType(deliveryType)
    .resize(fill(width, height));
  return img.toURL();
}

export function isCloudinaryURL(srcUrl: string): boolean {
  if (!srcUrl) return false;
  const srcUrlObj = parseURL(srcUrl);
  return srcUrlObj && srcUrlObj?.host === "res.cloudinary.com";
}

export function parseCloudinaryURL(srcUrl: string): CloudinaryParams {
  let publicId, assetType, deliveryType, transformations, version;

  const srcUrlObj = parseURL(srcUrl);
  if (!srcUrlObj) return;

  const { pathname } = srcUrlObj;

  const parts = pathname.split("/");
  parts.shift(); // remove empty first element

  const cloudName = parts.shift();

  // SEO-friendly URL, remaining parts are all public ID
  if (!isAssetType(parts[0])) {
    assetType = "image";
    deliveryType = "upload";
    publicId = parts.join("/");

    return { cloudName, assetType, deliveryType, publicId };
  }

  assetType = getAssetType(parts.shift());
  deliveryType = isDeliveryType(parts[0]) ? parts.shift() : "upload";

  if (isTransformationString(parts[0])) {
    transformations = parts.shift();
  }

  if (parts[0].match(/^v\d+$/)) {
    version = parts.shift();
  }

  publicId = parts.join("/");

  return {
    cloudName,
    assetType,
    deliveryType,
    publicId,
    transformations,
    version,
  };
}
