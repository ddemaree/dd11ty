import { getRootPath, isRemotePath } from "@/utils";
import ColorThief from "colorthief";
import path from "path";
import chroma from "chroma-js";

const DEFAULT_IMAGE_URL = "https://img.demaree.me/twitter_name/ddemaree.jpg";

function resolveLocalImgUrl(src: string) {
  const imgPath = path.join(getRootPath(), src).replace(/\?.+$/, "");
  const imgLocalUrl = new URL(`file://${imgPath}`);
  imgLocalUrl.search = "";

  return imgLocalUrl;
}

export async function getImageInfo(src: null | string) {
  const imageInfo = {
    color: "#d44",
    textColor: "#fff",
    imageUrl: DEFAULT_IMAGE_URL,
  };

  if (!src) return imageInfo;

  if (isRemotePath(src)) {
    const remoteImgData = await fetch(src).then((res) => res.arrayBuffer());
    const imgDataUri = await resizeImage(remoteImgData);
    const imgColorRgb = await ColorThief.getColor(imgDataUri);
    Object.assign(imageInfo, getColorInfo(imgColorRgb), {
      imageUrl: imgDataUri,
    });
  } else {
    const imgLocalUrl = resolveLocalImgUrl(src);
    const imgDataUri = await resizeImage(imgLocalUrl.pathname);
    const imgColorRgb = await ColorThief.getColor(imgDataUri);

    Object.assign(imageInfo, getColorInfo(imgColorRgb), {
      imageUrl: imgDataUri,
    });
  }

  return imageInfo;
}

export function getColorInfo(color: string | number | number[] | chroma.Color) {
  const out = { textColor: "#ffffff" };

  const _col = chroma(color as chroma.Color);
  const luminance = _col.luminance();
  const wContrast = chroma.contrast("#ffffff", _col);
  const bContrast = chroma.contrast("#000000", _col);

  if (bContrast > wContrast) {
    out.textColor = "#000000";
  }

  return Object.assign(out, {
    luminance,
    wContrast,
    bContrast,
    color: _col.hex(),
  });
}

async function resizeImage(input: string | ArrayBuffer) {
  const sharp = (await import("sharp")).default;
  const imgSharp = sharp(input).resize({
    width: 400,
    height: 600,
    fit: "cover",
    position: "center",
  });

  const _buffer = await imgSharp.png().toBuffer();

  return `data:image/png;base64,${_buffer.toString("base64")}`;
}
