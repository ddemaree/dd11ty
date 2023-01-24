import { Cloudinary, CloudinaryImage } from "@cloudinary/url-gen";

import { fill, scale } from "@cloudinary/url-gen/actions/resize";
import { getInfo } from "@cloudinary/url-gen/qualifiers/flag";
import { blur } from "@cloudinary/url-gen/actions/effect";
import { quality } from "@cloudinary/url-gen/actions/delivery";

export const cld = new Cloudinary({
  cloud: { cloudName: "demaree" },
  url: {
    secure: true,
    analytics: false,
  },
});

export function cloudinaryImage(src) {
  return cld.image(src);
}

export function cloudinaryResizeImage(src: string | CloudinaryImage, size) {
  if (typeof src === "string") {
    src = cloudinaryImage(src);
  }

  return src.resize(scale(size)).toURL();
}

function fullCloudinaryImg(src) {
  return cloudinaryImage(src).resize(fill(1600));
}

export async function getCloudinaryImageInfo(src) {
  const img = fullCloudinaryImg(src).addFlag(getInfo());
  const imgInfoUrl = img.toURL();

  const imageInfo = await fetch(imgInfoUrl)
    .then(async (res) => {
      let imgInfoData = {
        output: { width: null, height: null, bytes: null },
        url: imgInfoUrl,
      };
      try {
        imgInfoData = await res.json();
      } catch (err) {
        console.log(err, res);
      }
      return imgInfoData;
    })
    .catch((err) => ({
      err,
      imgInfoUrl,
      output: { width: null, height: null, bytes: null },
    }));

  const {
    output: { width, height, bytes },
  } = imageInfo;

  return { width, height, bytes };
}

export function getLQIP(src) {
  const img = cloudinaryImage(src)
    .resize(fill(80))
    .addAction(blur(600))
    .addAction(quality(80));
  return img.toURL();
}

export function getImageUrl(src) {
  const img = fullCloudinaryImg(src).format("auto");
  return img.toURL();
}

export function getCloudinaryThumbnailUrl(src) {
  const img = cloudinaryImage(src).resize(fill(600, 312));
  return img.toURL();
}
