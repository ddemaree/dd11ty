import fetchFontFile from "./fetchFontFile";

interface ImageResponseOptions {
  width: number;
  height: number;
  fonts: {
    data: ArrayBuffer;
    name: string;
    weight: number;
  }[];
}

export default async function getSocialImageOptions(): Promise<ImageResponseOptions> {
  const fontData = await fetchFontFile("Mona-Sans-SemiBoldWide.woff");
  const fontDataMonaMedium = await fetchFontFile("Mona-Sans-Medium.woff");

  return {
    width: 1200,
    height: 600,
    fonts: [
      {
        data: fontData,
        name: "MonaSansWide",
        weight: 600,
      },
      {
        data: fontDataMonaMedium,
        name: "MonaSans",
        weight: 500,
      },
    ],
  };
}
