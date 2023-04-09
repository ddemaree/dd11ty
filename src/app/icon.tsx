import { svgPathData } from "@lib/icons/faDDLogo";
import colors from "tailwindcss/colors";

export const size = {
  width: 520,
  height: 520,
};
export const contentType = "image/svg+xml";

export default async function icon() {
  const env = process.env.NODE_ENV;
  const isDev = env === "development";

  const keyColor = isDev ? colors.blue[500] : colors.red[500];

  const svgBody = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 520 520"
      width="${size.width}"
      height="${size.height}"
      preserveAspectRatio="none"
    >
      <style>
        .a { fill: ${keyColor}; }
        .b { fill: white; }

        @media (prefers-color-scheme: dark) {
          .a { fill: #222; }
          .b { fill: ${keyColor}; }
        }
      </style>
      <rect width="520" height="520" fill="#EF4444" class="a" />
      <path x="57" y="73" width="415" height="376" fill="currentColor" transform-origin="50% 50%" transform="scale(0.8)" class="b" d="${svgPathData}" />
    </svg>
  `;

  // const body = ReactDOMServer.renderToStaticMarkup();

  return new Response(svgBody, {
    headers: {
      "Content-Type": contentType,
    },
  });

  // return new ImageResponse(
  //   (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       viewBox="0 0 520 520"
  //       width={size.width}
  //       height={size.height}
  //     >
  //       <rect width="520" height="520" fill="#EF4444" />
  //       <path fill="currentColor" d={svgPathData} width="400" />
  //     </svg>
  //   ),
  //   {
  //     width: size.width,
  //     height: size.height,
  //   }
  // );
}
