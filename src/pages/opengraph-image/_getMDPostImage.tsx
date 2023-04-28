import { ImageResponse } from "@vercel/og";
import { type CollectionEntry, getEntryBySlug } from "astro:content";
import { getFonts } from "./_fonts";
import DDIcon from "@components/DDIcon";

function StaticPostImageTemplate({
  post,
  color = "#d44",
  textColor = "#fff",
}: {
  post: CollectionEntry<"blog">;
  color?: string;
  textColor?: string;
  imageUrl?: string;
}) {
  const { title, excerpt } = post.data;

  return (
    <div
      tw="flex flex-col items-center justify-center w-screen h-screen bg-red-700"
      style={{
        backgroundImage:
          "linear-gradient(to bottom right, #d44, #d44 60%, #000)",
      }}>
      <div
        tw="p-12 absolute left-6 top-0 bottom-0 flex flex-col justify-center items-start"
        style={{ width: 720 }}>
        <h1 tw="text-7xl leading-none text-white">{title}</h1>
        {excerpt && (
          <p
            tw="text-4xl leading-tight text-red-200"
            style={{ fontFamily: "IvarText" }}>
            {excerpt}
          </p>
        )}
      </div>
      <div
        tw="flex absolute right-6 bottom-0 top-0 w-1/3 justify-center items-center"
        style={{
          color: textColor,
        }}>
        <DDIcon size="200px" />
      </div>
    </div>
  );
}

export async function getStaticPostImage(slug: string, _request: Request) {
  const post = await getEntryBySlug("blog", slug);
  if (!post) return;

  const { title } = post.data;
  const fonts = await getFonts();

  return new ImageResponse(<StaticPostImageTemplate post={post} />, {
    width: 1200,
    height: 600,
    fonts,
  });
}
