import React from "react";
import { svgPathData } from "@lib/icons/faDDLogo";

import type { SVGAttributes } from "react";
import clsx from "clsx";

type DDIconProps = SVGAttributes<SVGElement> & {
  size?: string;
  color?: string;
};

export default function DDIcon({
  size = "1.5em",
  color = "currentColor",
  ...props
}: DDIconProps) {

  props.className = clsx("dd-icon", props.className)

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      style={{
        width: "auto",
        height: size,
      }}
      {...props}
    >
      <path fill={color} d={svgPathData}></path>
    </svg>
  );
}
