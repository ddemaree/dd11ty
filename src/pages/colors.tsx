import _ from "lodash";
import "../styles/blog.css";
import baseTokens from "../tokens/color/base";
import chroma from "chroma-js";
import clsx from "clsx";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faCheckCircle } from "@fortawesome/sharp-solid-svg-icons";

const { base: baseColors } = baseTokens.color;

const CONTRAST_TESTS = [
  { label: "AA Large", threshold: 3 },
  { label: "AA Normal", threshold: 4.5 },
  { label: "AAA Large", threshold: 4.5 },
  { label: "AAA Normal", threshold: 7 },
];

const contrastModes = ["white", "black"] as const;
type ContrastMode = typeof contrastModes[number];

const previewModes = ["swatches", "specimens"] as const;
type PreviewMode = typeof previewModes[number];

const ThemeContext = createContext<{
  contrastMode: ContrastMode;
  previewMode: PreviewMode;
}>({ contrastMode: "white", previewMode: "swatches" });

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

export default function TestPage() {
  const [contrastMode, setContrastMode] = useState<ContrastMode>("black");
  const [previewMode, setPreviewMode] = useState<PreviewMode>("swatches");

  const wrapperClass = clsx(
    "font-['soehne-web'] p-6 flex flex-col gap-6 min-h-screen",
    contrastMode === "black" && "bg-black text-white"
  );

  function toggleMode() {
    setContrastMode(contrastMode === "white" ? "black" : "white");
  }

  return (
    <div className={wrapperClass}>
      <form className="flex gap-6">
        <div className="flex gap-3">
          {contrastModes.map((mode) => (
            <label key={mode} className="flex items-center gap-1">
              <input
                type="radio"
                value={mode}
                checked={contrastMode === mode}
                onChange={(e) => setContrastMode(mode)}
                name="contrastMode"
              />
              <span>{mode}</span>
            </label>
          ))}
        </div>
        <div className="flex gap-3">
          {previewModes.map((mode) => (
            <label key={mode} className="flex items-center gap-1">
              <input
                type="radio"
                value={mode}
                checked={previewMode === mode}
                onChange={(e) => setPreviewMode(mode)}
                name="previewMode"
              />
              <span>{mode}</span>
            </label>
          ))}
        </div>
      </form>

      <ThemeContext.Provider value={{ contrastMode, previewMode }}>
        {previewMode === "swatches" && <SwatchPreview />}
        {previewMode === "specimens" && <SpecimenPreview />}
      </ThemeContext.Provider>
    </div>
  );
}

const ContrastChip = ({
  children,
  color,
}: PropsWithChildren<{ color: "green" | "red" }>) => {
  const { contrastMode } = useContext(ThemeContext);

  const classValue = clsx(
    "inline-flex items-center gap-1 px-1 rounded-full",
    contrastMode === "white"
      ? `text-black bg-${color}-400`
      : `text-white bg-${color}-700`
  );

  return <div className={classValue}>{children}</div>;
};

const Pass = () => (
  <ContrastChip color="green">
    <FontAwesomeIcon icon={faCheckCircle} size="sm" />
    <span>PASS</span>
  </ContrastChip>
);

const Fail = () => (
  <ContrastChip color="red">
    <FontAwesomeIcon icon={faClose} size="sm" />
    <span>FAIL</span>
  </ContrastChip>
);

function SpecimenPreview() {
  const { contrastMode } = useContext(ThemeContext);
  return (
    <div>
      {tokensToGroups().map(({ family, colors }) => (
        <div key={family}>
          <h2 className="font-mono font-semibold text-lg mb-2">{family}</h2>
          <p
            className={clsx(
              "font-serif max-w-[59ch] mb-12",
              contrastMode === "black" ? "text-neutral-200" : "text-neutral-800"
            )}
          >
            It’s only been a few days since{" "}
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className={clsx("underline font-medium")}
              style={{ color: colors.find((c) => c.key === "50")?.value }}
            >
              Boots & Bones
            </a>{" "}
            opened across the street from the Grove Street PATH station, which
            sits in the middle of Jersey City’s most prominent public square.
            The front windows are flung open to spring breezes, and guys nursing
            beers sit on barstools leaning out the windows as my editor and I
            arrived for a First Look.
          </p>
        </div>
      ))}
    </div>
  );
}

function SwatchPreview() {
  const { contrastMode } = useContext(ThemeContext);

  return (
    <div>
      {tokensToGroups().map(({ family, colors }) => (
        <div key={family}>
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
                <div className={classValue} key={key}>
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
