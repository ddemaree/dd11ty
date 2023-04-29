import { Cloudinary } from "@cloudinary/url-gen";
import { Resize } from "@cloudinary/url-gen/actions";
import { ensureURL } from "@/utils";

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: "demaree",
  },
  url: {
    secure: true, // force https, set to false to force http
    analytics: false,
    cname: "img.demaree.me",
    secureDistribution: "img.demaree.me",
    privateCdn: true,
  },
});

export default cloudinary;

export function isCloudinaryURL(srcUrl: URL | string) {
  srcUrl = ensureURL(srcUrl);

  if (
    srcUrl.hostname === "res.cloudinary.com" ||
    srcUrl.hostname === "cdn.substack.com" ||
    srcUrl.hostname === "img.demaree.me"
  )
    return true;

  return false;
}

interface CloudinaryParams {
  cloudName: string;
  assetType: AssetType;
  deliveryType: DeliveryType;
  publicId: string;
  transformations?: string;
  version?: string;
}

const ASSET_TYPES = {
  image: ["image", "images"],
  raw: ["raw", "files"],
  video: ["video", "videos"],
} as const;

type AssetType = keyof typeof ASSET_TYPES;
type AssetValue = (typeof ASSET_TYPES)[AssetType][number];

const DELIVERY_TYPES = ["upload", "fetch", "twitter_name"] as const;
type DeliveryType = (typeof DELIVERY_TYPES)[number];

function isAssetType(type: string | AssetValue) {
  const allTypes = Object.values(ASSET_TYPES).flat() as (string | AssetValue)[];
  return !!allTypes.includes(type);
}

// function getAssetType(urlType: string) {
//   const _keys = Object.keys(ASSET_TYPES) as string[];
//   return _keys.find(
//     (k) => ASSET_TYPES[k] === urlType || ASSET_TYPES[k].includes(urlType)
//   );
// }

function isDeliveryType(urlType: DeliveryType) {
  return DELIVERY_TYPES.includes(urlType);
}

function isTransformationString(urlPart: string) {
  return urlPart.match(/([a-z]+_[^\;,]+,?)+/);
}

export function parseCloudinaryURL(
  srcUrl: URL | string
): CloudinaryParams | void {
  srcUrl = ensureURL(srcUrl);

  let publicId, assetType, deliveryType, transformations, version;

  const pathname = srcUrl.pathname.slice(1);
  const parts = pathname.split("/");

  // const cloudName = parts.shift();

  // // SEO-friendly URL, remaining parts are all public ID
  // if (!isAssetType(parts[0])) {
  //   assetType = "image";
  //   deliveryType = "upload";
  //   publicId = parts.join("/");

  //   return { cloudName, assetType, deliveryType, publicId };
  // }

  // assetType = getAssetType(parts.shift());
  // deliveryType = isDeliveryType(parts[0]) ? parts.shift() : "upload";

  // if (isTransformationString(parts[0])) {
  //   transformations = parts.shift();
  // }

  // if (parts[0].match(/^v\d+$/)) {
  //   version = parts.shift();
  // }

  // publicId = parts.join("/");

  // return {
  //   cloudName,
  //   assetType,
  //   deliveryType,
  //   publicId,
  //   transformations,
  //   version,
  // };
}
