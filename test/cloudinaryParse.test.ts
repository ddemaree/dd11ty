import { parseCloudinaryURL } from "@lib/cloudinary";
import { describe, expect, test } from "vitest";

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

    expect(result.publicId).toEqual("ddemaree.jpg");
  });

  test("Fetched external URL", () => {
    const result = parseCloudinaryURL(
      "https://res.cloudinary.com/demaree/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fd1e2c39d-9348-46a2-8845-95d6da30fb37_1752x1360.png"
    );

    expect(result.deliveryType).toEqual("fetch");
    expect(result.publicId).toEqual(
      "https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fd1e2c39d-9348-46a2-8845-95d6da30fb37_1752x1360.png"
    );
  });
});
