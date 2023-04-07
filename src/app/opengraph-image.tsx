import { ImageResponse } from "next/server";
import DDIcon from "@components/DDIcon";

export const alt = "demaree.me";

export default async function og() {
  const soehneFontData = await fetch(
    "https://fonts.demaree.me/soehne/soehne-web-halbfett.woff"
  ).then((r) => r.arrayBuffer());

  const resp = new ImageResponse(
    (
      <div
        tw="flex flex-col bg-red-600 w-screen h-screen text-white items-center justify-center relative text-center"
        style={{ border: "none" }}
      >
        <div tw="flex-1 flex flex-col items-center justify-center">
          <DDIcon size="256px" />
        </div>
        <div
          tw="text-4xl absolute bottom-10"
          style={{ fontFamily: "Soehne", textAlign: "center" }}
        >
          demaree.me
        </div>
      </div>
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
      ],
    }
  );

  console.log("Test whether this is called");

  return resp;
}
