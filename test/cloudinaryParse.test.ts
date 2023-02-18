import { describe, expect, test } from "vitest";

interface CloudinaryParams {
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

// function getDeliveryType(urlType) {
//   const _keys = Object.keys(DELIVERY_TYPES);
//   return _keys.find(
//     (k) => DELIVERY_TYPES[k] === urlType || DELIVERY_TYPES[k].includes(urlType)
//   );
// }

function parseCloudinaryURL(srcUrl: string): CloudinaryParams {
  let publicId, assetType, deliveryType, transformations, version;
  const srcUrlObj = new URL(srcUrl);
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

describe("parseCloudinaryURL", () => {
  test("simplest image upload", () => {
    const result = parseCloudinaryURL(
      "https://res.cloudinary.com/demaree/image/upload/thing.jpg"
    );

    const { cloudName } = result;
    expect(cloudName).toEqual("demaree");
    expect(result.assetType).toEqual("image");
    expect(result.deliveryType).toEqual("upload");
  });

  test("image upload with transformations", () => {
    const result = parseCloudinaryURL(
      "https://res.cloudinary.com/demaree/image/upload/w_1200,ar_1/thing.jpg"
    );

    const { cloudName } = result;
    expect(result.publicId).toEqual("thing.jpg");
  });

  test("public ID with folders", () => {
    const result = parseCloudinaryURL(
      "https://res.cloudinary.com/demaree/image/upload/w_1200,ar_1/folder/subfolder/thing.jpg"
    );

    const { cloudName } = result;
    expect(result.publicId).toEqual("folder/subfolder/thing.jpg");
  });

  test("versioned URL", () => {
    const result = parseCloudinaryURL(
      "https://res.cloudinary.com/demaree/image/upload/w_1200,ar_1/v123/folder/thing.jpg"
    );

    const { cloudName } = result;
    expect(result.publicId).toEqual("folder/thing.jpg");
  });

  test("SEO-friendly simple URL", () => {
    const result = parseCloudinaryURL(
      "https://res.cloudinary.com/demaree/folder/thing.jpg"
    );

    const { cloudName } = result;
    expect(result.publicId).toEqual("folder/thing.jpg");
  });

  test("Shorter but not shortest URL", () => {
    const result = parseCloudinaryURL(
      "https://res.cloudinary.com/demaree/images/folder/thing.jpg"
    );

    const { cloudName } = result;
    expect(result.publicId).toEqual("folder/thing.jpg");
  });

  test("twitter avatar", () => {
    const result = parseCloudinaryURL(
      "https://res.cloudinary.com/demaree/image/twitter_name/ddemaree.jpg"
    );

    console.log(result);
    expect(result.publicId).toEqual("ddemaree.jpg");
  });
});
