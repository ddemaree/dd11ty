import { ImageResponse } from "@vercel/og";
import DDIcon from "@components/DDIcon";
import { SOCIAL_IMAGE_PARAMS } from "@lib/siteUtils";

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

function CardLayout({ children }: { children: any | any[] }) {
  return (
    <div
      tw="flex flex-col bg-red-600 w-full h-full relative"
      style={{ fontFamily: "MonaSans", color: "#ffffff" }}
    >
      {children}
    </div>
  );
}

function LogoWithTitle({ title }: { title: string }) {
  return (
    <div tw="flex flex-col flex-1 relative w-full" style={{ zIndex: "20" }}>
      <div tw="flex w-full items-center justify-center flex-1 px-12 -mb-20 relative">
        <div
          tw="text-[116px] leading-[1.1] text-center relative z-20"
          style={{ fontFamily: "MonaSansWide" }}
        >
          {title}
        </div>
      </div>
      <div tw="flex w-full items-end justify-between leading-none pb-10 px-12">
        <div style={{ fontSize: "32px", opacity: "0.7" }}>demaree.me</div>
        <DDIcon size="72px" color="#ffffff" />
      </div>
    </div>
  );
}

function LogoOnly() {
  return (
    <div tw="w-full flex flex-col flex-1 items-center justify-center">
      <DDIcon size="256px" color="#ffffff" />
      <div tw="text-5xl py-12 opacity-70 -mb-12">demaree.me</div>
    </div>
  );
}

export default async function handler({ url }: { url: string }) {
  const { searchParams } = new URL(url);

  const hasTitle = searchParams.has("title");
  let title: string = hasTitle
    ? (searchParams.get("title")?.slice(0, 100) as string)
    : "";

  title = decodeURIComponent(title.replace(/_/g, " "));

  const fontData = await fontMonaSemiboldWide;
  const fontDataMonaMedium = await fontMonaMedium;

  return new ImageResponse(
    (
      <CardLayout>
        {title ? <LogoWithTitle title={title} /> : <LogoOnly />}
      </CardLayout>
    ),
    {
      ...SOCIAL_IMAGE_PARAMS,
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
