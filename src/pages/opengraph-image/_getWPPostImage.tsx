import { ImageResponse } from "@vercel/og";

import ColorThief from "colorthief";

import { getSinglePost } from "@lib/wordpress";

export async function getPostImage(slug: string) {
  const post = await getSinglePost(slug);
  if (!post) throw new Error("Post not found");

  const soehneFontData = await fetch(
    "https://fonts.demaree.me/soehne/soehne-web-halbfett.woff"
  ).then((r) => r.arrayBuffer());

  const soeheneFontBuchData = await fetch(
    "https://fonts.demaree.me/soehne/soehne-web-buch.woff"
  ).then((r) => r.arrayBuffer());

  const ivarFontData = await fetch(
    "https://fonts.demaree.me/ivar-text/IvarText-Regular.otf"
  ).then((r) => r.arrayBuffer());

  let color: number[] = chroma(colors.red[600]).rgb();
  let imageUrl: string = DEFAULT_IMAGE_URL;

  if (post.featuredImageURL) {
    imageUrl = post.featuredImageURL;
    color = await ColorThief.getColor(imageUrl);
  }

  const resp = new ImageResponse(
    (
      <PostImageTemplate
        color={color}
        imageUrl={imageUrl}
        title={post.title}
        excerpt={post.excerpt}
      />
    ),
    {
      // debug: true,
      width: 1200,
      height: 600,
      fonts: [
        {
          data: soehneFontData,
          name: "Soehne",
          weight: 600,
        },
        {
          data: soeheneFontBuchData,
          name: "Soehne",
          weight: 400,
        },
        {
          data: ivarFontData,
          name: "IvarText",
          weight: 400,
        },
      ],
    }
  );

  return resp;
}

import chroma from "chroma-js";
import colors from "tailwindcss/colors";
import DDIcon from "@components/DDIcon";
import { decode } from "html-entities";

function getColorInfo(color: string | number | number[] | chroma.Color) {
  const _col = chroma(color as chroma.Color);
  const luminance = chroma(color as chroma.Color).luminance();
  const wContrast = chroma.contrast("#ffffff", _col);
  const bContrast = chroma.contrast("#000000", _col);

  return { luminance, wContrast, bContrast };
}

const DEFAULT_IMAGE_URL = "https://img.demaree.me/twitter_name/ddemaree.jpg";

export function PostImageTemplate({
  color,
  imageUrl,
  title,
  excerpt,
}: {
  color: string | number | number[] | chroma.Color;
  imageUrl: string;
  title?: string;
  excerpt?: string;
}) {
  color = chroma(color as any).rgb();
  let textColor = "#ffffff";

  const { wContrast, bContrast } = getColorInfo(color);

  if (bContrast > wContrast) {
    textColor = "#000000";
  }

  return (
    <div tw="flex flex-col bg-red-600 w-screen h-screen items-center justify-center relative">
      <div
        style={{
          color: textColor,
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          backgroundColor: `rgb(${color.join(" ")})`,
        }}
      ></div>
      {imageUrl && (
        <div
          tw="flex"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: "32%",
          }}
        >
          <img
            src={imageUrl}
            tw="w-full h-full"
            style={{ objectFit: "cover", objectPosition: "center center" }}
          />
        </div>
      )}
      <div
        tw="p-12"
        style={{
          display: "flex",
          position: "absolute",
          right: 0,
          bottom: 0,
          color: textColor,
        }}
      >
        <DDIcon size="80px" />
      </div>
      <div
        tw="flex flex-col items-start justify-center absolute right-0 top-0 bottom-0 p-16 leading-none"
        style={{
          paddingBottom: "108px",
          width: "68%",
          fontFamily: "Soehne",
          color: textColor,
        }}
      >
        <p
          tw="pr-8 m-0 font-semibold"
          style={{
            fontSize: "68px",
            lineHeight: "0.98em",
          }}
        >
          {decode(title)}
        </p>
        <p
          tw="m-0"
          style={{
            fontSize: "40px",
            marginTop: "0.5em",
            opacity: 0.7,
          }}
        >
          {decode(excerpt)}
        </p>
      </div>
    </div>
  );
}
