import { svgPathData } from "@lib/icons/faDDLogo";

export default function DDIcon({
  size = "1.5em",
  color = "currentColor",
}: {
  size?: string;
  color?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className="dd-icon"
      style={{
        width: size,
        height: size,
      }}
    >
      <path fill={color} d={svgPathData}></path>
    </svg>
  );
}
