import { ImageResponse } from "@vercel/og";
import DDIcon from "@components/DDIcon";

export const config = {
  runtime: "experimental-edge",
};

// Make sure the font exists in the specified path:
const fontMonaSemiboldWide = fetch(
  new URL("../../../public/fonts/Mona-Sans-SemiBoldWide.woff", import.meta.url)
).then((res) => res.arrayBuffer());

const fontMonaMedium = fetch(
  new URL("../../../public/fonts/Mona-Sans-Medium.woff", import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler({ url }: { url: string }) {
  const { searchParams } = new URL(url);

  const hasTitle = searchParams.has("title");
  let title: string = hasTitle
    ? (searchParams.get("title")?.slice(0, 100) as string)
    : "";

  title = decodeURIComponent(title.replace(/_/g, " "));

  const fontData = await fontMonaSemiboldWide;
  const fontDataMonaMedium = await fontMonaMedium;

  if (!title) {
    return new ImageResponse(
      (
        <div tw="bg-red-600 text-white flex flex-col w-full h-full">
          <div tw="flex w-full flex-col flex-1 items-center justify-center">
            <div tw="flex-1 flex items-center justify-center -mb-20">
              <DDIcon size="256px" />
            </div>
            <div
              tw="text-5xl py-12 opacity-70"
              style={{ fontFamily: "MonaSans" }}
            >
              demaree.me
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

  return new ImageResponse(
    (
      <div
        tw="flex flex-col bg-red-600 text-white w-full h-full relative"
        style={{ fontFamily: "MonaSans" }}
      >
        <div tw="flex flex-col flex-1 relative w-full" style={{ zIndex: "20" }}>
          <div tw="flex w-full items-center justify-center flex-1 px-12 -mb-20 relative">
            <div
              tw="text-[116px] leading-[1.1] text-center relative z-20"
              style={{ fontFamily: "MonaSansWide" }}
            >
              {title}
            </div>
          </div>
          <div tw="flex w-full items-end justify-between leading-none text-red-200 pb-10 px-12">
            <div style={{ fontSize: "32px" }}>demaree.me</div>
            <DDIcon size="72px" />
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
