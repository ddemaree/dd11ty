import { ImageResponse } from "@vercel/og";
import ImageTest from "@/components/ImageTest";
import DDIcon from "@/components/DDIcon";
import type { ImageAPIRoute } from "@/types/image-generation";

import { getPostImage } from "./_getPostImage";

const content = {
  type: "div",
  key: "root",
  props: {
    children: [ImageTest(), DDIcon({ size: "64px", tw: "absolute bottom-12" })],
    style: { gap: "1rem" },
    tw: "flex flex-col items-center justify-center relative text-center text-white bg-red-600 w-screen h-screen",
  },
};

export const get: ImageAPIRoute = async ({ params: { pathname } }) => {
  if (!pathname) pathname = "default.png";

  // Remove file extension and/or trailing slash
  pathname = pathname.replace(/\.[a-z]+\/?$/, "");

  try {
    if (pathname.startsWith("post/")) {
      const [_, slug] = pathname.split("/");
      const postImageResponse = await getPostImage(slug);
      return postImageResponse;
    }
  } catch (error) {
    console.error(error);
  }

  const soehneFontData = await fetch(
    "https://fonts.demaree.me/soehne/soehne-web-halbfett.woff"
  ).then((r) => r.arrayBuffer());

  return new ImageResponse(content, {
    width: 1200,
    height: 600,
    fonts: [
      {
        name: "soehne",
        data: soehneFontData,
      },
    ],
  });
};
