import type { SatoriOptions } from "satori";

export async function getFonts(): Promise<SatoriOptions["fonts"]> {
  const soehneHalbfett = await fetch(
    "https://fonts.demaree.me/soehne/soehne-web-halbfett.woff"
  ).then((r) => r.arrayBuffer());

  const soehneBuch = await fetch(
    "https://fonts.demaree.me/soehne/soehne-web-buch.woff"
  ).then((r) => r.arrayBuffer());

  const ivarTextRegular = await fetch(
    "https://fonts.demaree.me/ivar-text/IvarText-Regular.otf"
  ).then((r) => r.arrayBuffer());

  return [
    {
      data: soehneHalbfett,
      name: "Soehne",
      weight: 600,
    },
    {
      data: soehneBuch,
      name: "Soehne",
      weight: 400,
    },
    {
      data: ivarTextRegular,
      name: "IvarText",
      weight: 400,
    },
  ];

  // return {
  //   soehneHalbfett: soehneFontData,
  //   soehneBuch: soeheneFontBuchData,
  //   ivarTextRegular: ivarFontData,
  // };
}
