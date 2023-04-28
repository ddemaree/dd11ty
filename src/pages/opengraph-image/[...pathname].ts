import { ImageResponse } from "@vercel/og";
import type { ImageAPIRoute } from "@/types/image-generation";
import { CollectionEntry, getCollection } from "astro:content";

import DDIcon from "@/components/DDIcon";
import ImageTest from "./ImageTest";
import { getStaticPostImage } from "./_getMDPostImage";

// export const prerender = true;
// export const getStaticPaths = async () => {
//   const allBlogPosts = await getCollection("blog");
//   return allBlogPosts.map((p: CollectionEntry<"blog">) => ({
//     params: {
//       pathname: `post/${p.slug}.png`,
//     },
//   }));
// };

const content = {
  type: "div",
  key: "root",
  props: {
    children: [ImageTest(), DDIcon({ size: "64px", tw: "absolute bottom-12" })],
    style: { gap: "1rem" },
    tw: "flex flex-col items-center justify-center relative text-center text-white bg-red-600 w-screen h-screen",
  },
};

export const get: ImageAPIRoute = async ({ request, params: { pathname } }) => {
  if (!pathname) pathname = "default.png";

  // Remove file extension and/or trailing slash
  pathname = pathname.replace(/\.[a-z]+\/?$/, "");

  if (pathname.startsWith("post/")) {
    const slug = pathname.replace(/^post\//, "");
    return getStaticPostImage(slug, request) as Promise<ImageResponse>;
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
