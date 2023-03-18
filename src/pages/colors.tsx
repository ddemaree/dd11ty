import _ from "lodash";
import "../styles/blog.css";
import baseTokens from "../tokens/color/base";
import chroma from "chroma-js";
import clsx from "clsx";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faCheckCircle } from "@fortawesome/sharp-solid-svg-icons";

const { base: baseColors } = baseTokens.color;

function tokensToGroups(tokens = baseColors) {
  return _.map(tokens, (colors, family) => {
    return {
      family,
      colors: _.map(colors, ({ value }, key) => ({ key, value })),
    };
  });
}

function luminance(color: string | chroma.Color) {
  return chroma(color).luminance();
}

function whiteContrast(color: string | chroma.Color) {
  const whiteLum = 1.05;
  const textLum = luminance(color);

  return whiteLum / textLum;
}

function blackContrast(color: string | chroma.Color) {
  const blackLum = 0.05;
  const textLum = luminance(color);

  return textLum / blackLum;
}

const CONTRAST_TESTS = [
  { label: "AA Large", threshold: 3 },
  { label: "AA Normal", threshold: 4.5 },
  { label: "AAA Large", threshold: 4.5 },
  { label: "AAA Normal", threshold: 7 },
];

export default function TestPage() {
  const [contrastMode, setContrastMode] = useState("black");

  const Pass = () => (
    <div
      className={clsx(
        "inline-flex items-center gap-1 px-1 rounded-full",
        contrastMode === "white"
          ? "text-black bg-green-400"
          : "text-white bg-green-700"
      )}
    >
      <FontAwesomeIcon icon={faCheckCircle} size="sm" />
      <span>PASS</span>
    </div>
  );

  const Fail = () => (
    <div>
      <FontAwesomeIcon icon={faClose} size="sm" />
      <span>FAIL</span>
    </div>
  );

  const wrapperClass = clsx(
    "font-['soehne-web'] p-6 flex flex-col gap-6 min-h-screen",
    contrastMode === "black" && "bg-black text-white"
  );

  function toggleMode() {
    setContrastMode(contrastMode === "white" ? "black" : "white");
  }

  return (
    <div className={wrapperClass}>
      <button onClick={(e) => toggleMode()}>Switch mode</button>
      {tokensToGroups().map(({ family, colors }) => (
        <div>
          <h2 className="font-mono font-semibold text-lg mb-2">{family}</h2>
          <div className="flex flex-wrap gap-2 font-mono text-sm">
            {colors.map(({ key, value }) => {
              const lum = luminance(value);
              const contrast = {
                white: whiteContrast(value),
                black: blackContrast(value),
              };

              const classValue = clsx(
                "w-32 h-32",
                contrast.white > contrast.black ? "text-white" : "text-black"
              );

              return (
                <div className={classValue}>
                  <div
                    className="p-2 rounded"
                    style={{ backgroundColor: value }}
                  >
                    <div>{key}</div>
                    <div>{value}</div>
                  </div>
                  <div className="text-xs p-2" style={{ color: value }}>
                    {/* <div>{lum.toFixed(2)}</div> */}
                    {contrastMode === "white" && (
                      <>
                        <div className="mb-1">{contrast.white.toFixed(2)}</div>
                        {contrast.white >= 4.5 ? <Pass /> : <Fail />}
                      </>
                    )}
                    {contrastMode === "black" && (
                      <>
                        <div className="mb-1">{contrast.black.toFixed(2)}</div>
                        {contrast.black >= 4.5 ? <Pass /> : <Fail />}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
