import type { SatoriOptions } from "satori";
import { ImageResponse } from "@vercel/og";
import { type CollectionEntry, getEntryBySlug } from "astro:content";
import { getFonts } from "./_fonts";
import { getImageInfo } from "./_getImageInfo";
import DDIcon from "@components/DDIcon";

const DEFAULT_IMAGE_URL = "https://img.demaree.me/twitter_name/ddemaree.jpg";

function StaticPostImageTemplate({
  post,
  color,
  textColor,
  imageUrl = DEFAULT_IMAGE_URL,
}: {
  post: CollectionEntry<"blog">;
  color?: string;
  textColor?: string;
  imageUrl?: string;
}) {
  const { title } = post.data;

  return (
    <div
      tw="flex flex-col items-center justify-center w-screen h-screen"
      style={{ backgroundColor: color, color: textColor }}>
      {imageUrl && (
        <div tw="flex absolute top-0 left-0 bottom-0 w-1/3">
          <img
            src={imageUrl}
            width="200"
            height="200"
            tw="w-full h-full"
            style={{ objectFit: "cover", objectPosition: "center center" }}
          />
        </div>
      )}
      <div tw="w-2/3 p-12 absolute right-0 top-0 bottom-0 flex flex-col justify-center items-start">
        <h1 tw="text-7xl leading-none">{title}</h1>
      </div>
      <div
        tw="p-12 flex absolute right-0 bottom-0"
        style={{
          color: textColor,
        }}>
        <DDIcon size="80px" />
      </div>
    </div>
  );
}

export async function getStaticPostImage(slug: string, _request: Request) {
  const post = await getEntryBySlug("blog", slug);
  if (!post) return;

  const { title, cover, cover_url } = post.data;

  const colorInfo = await getImageInfo(cover?.src || cover_url || null);

  const { color, textColor, imageUrl } = colorInfo;

  const fonts = await getFonts();

  const resp = new ImageResponse(
    (
      <StaticPostImageTemplate
        post={post}
        color={color}
        textColor={textColor}
        imageUrl={imageUrl}
      />
    ),
    {
      width: 1200,
      height: 600,
      fonts,
    }
  );

  return resp;
}
