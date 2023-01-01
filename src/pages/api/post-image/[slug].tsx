import _ from "lodash";
import { ImageResponse } from "@vercel/og";
import { getSinglePost, WordpressResponse } from "@lib/wordpress";
import { NextApiRequest, NextApiResponse } from "next";
import chroma from "chroma-js";
import colors from "tailwindcss/colors";
import DDIcon from "@components/DDIcon";

export const config = {
  runtime: "experimental-edge",
};

// Make sure the font exists in the specified path:
const fontMonaSemiboldWide = fetch(
  new URL(
    "../../../../public/fonts/Mona-Sans-SemiBoldWide.woff",
    import.meta.url
  )
).then((res) => res.arrayBuffer());

const fontMonaMedium = fetch(
  new URL("../../../../public/fonts/Mona-Sans-Medium.woff", import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { searchParams } = new URL(req.url as string);
  let slug = searchParams.get("slug") as string;

  if (slug.match(/\.png$/)) {
    slug = slug.replace(/\.png$/, "");
  }

  const { post } = (await getSinglePost(slug)) as WordpressResponse;

  if (!post) {
    return res.status(404);
  }

  const title = post.title;
  const image = post.featuredImage;
  let mainColor = colors.red[500];
  let textColor = "#ffffff";
  let imgUrl, imgLuma;

  if (image?.databaseId) {
    const imageData = await fetch(
      `https://demareedotme.wpengine.com/wp-json/wp/v2/media/${image.databaseId}`
    ).then((res) => res.json());

    const cldPublicId = imageData?._cloudinary?._public_id;

    // Just in case the featured image isn't from my Cloudinary
    if (cldPublicId) {
      const adminImageUrl = `https://api.cloudinary.com/v1_1/demaree/resources/image/upload/${cldPublicId}?colors=true`;

      const authString = Buffer.from(
        process.env.CLOUDINARY_API_KEY + ":" + process.env.CLOUDINARY_API_SECRET
      ).toString("base64");

      const adminImageData = await fetch(adminImageUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${authString}`,
        },
      }).then((res) => res.json());

      let [[imgMainColor]] = adminImageData.colors;
      mainColor = imgMainColor;

      imgUrl = `https://res.cloudinary.com/demaree/images/c_fill,w_1200,h_600,g_auto/${cldPublicId}.jpg`;

      const mc = chroma(mainColor);
      imgLuma = mc.luminance();
      if (imgLuma > 0.45) {
        textColor = "#000000";
      }
    }
  }

  const fontData = await fontMonaSemiboldWide;
  const fontDataMonaMedium = await fontMonaMedium;

  return new ImageResponse(
    (
      <div
        tw="flex flex-col bg-red-600 text-white w-full h-full relative"
        style={{
          fontFamily: "MonaSans",
          backgroundColor: mainColor,
          color: textColor,
        }}
      >
        {imgUrl && (
          <div
            tw="absolute inset-0 z-10 w-full bg-black flex opacity-50"
            style={{
              backgroundImage: `url(${imgUrl})`,
              backgroundSize: "1200px 600px",
            }}
          ></div>
        )}
        <div tw="flex flex-col w-full h-full relative" style={{ zIndex: "20" }}>
          <div tw="flex w-full items-end justify-start flex-1 px-16 relative text-left">
            <div
              tw="text-[82px] leading-[1.1] relative z-20 max-w-[20ch]"
              style={{ fontFamily: "MonaSansWide" }}
            >
              {title}
            </div>
          </div>
          <div tw="flex w-full items-center justify-between leading-none pb-10 px-16">
            <div style={{ fontSize: "36px" }}>demaree.me</div>
            <DDIcon size="72px" color={textColor} />
          </div>
        </div>
      </div>
    ),
    {
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
    }
  );
}
