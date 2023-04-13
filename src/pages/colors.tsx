import _ from "lodash";
import "../styles/blog.css";
import baseTokens from "../tokens/color/base";
import chroma from "chroma-js";
import clsx from "clsx";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faCheckCircle } from "@fortawesome/sharp-solid-svg-icons";
import { TestContent } from "@components/ColorTests";

import postcss from "postcss";
import postcssJs from "postcss-js";

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config.cjs";
import PostHeader from "@components/PostHeader";
// @ts-ignore
const { theme } = resolveConfig(tailwindConfig);

const { base: baseColors } = baseTokens.color;

const CONTRAST_TESTS = [
  { label: "AA Large", threshold: 3 },
  { label: "AA Normal", threshold: 4.5 },
  { label: "AAA Large", threshold: 4.5 },
  { label: "AAA Normal", threshold: 7 },
];

const COLORS = {
  light: {
    background: theme?.colors.stone[50],
    text: theme?.colors.stone[800],
    boldText: theme?.colors.stone[950],
    lightText: theme?.colors.stone[600],
    link: chroma(theme?.colors.red[500]).darken(0.4).hex(),
    code: theme?.colors.blue[600],
    codeBackground: theme?.colors.slate[100],
    dividers: theme?.colors.stone[200],
    blockquote: theme?.colors.stone[600],
    blockquoteBorder: theme?.colors.slate[200],
  },
  dark: {
    background: theme?.colors.stone[950],
    text: chroma(theme?.colors.stone[300]).darken(0.2).hex(),
    boldText: theme?.colors.stone[100],
    lightText: chroma(theme?.colors.stone[300]).darken(1.2).hex(),
    link: chroma(theme?.colors.red[500]).brighten(0.3).hex(),
    code: theme?.colors.blue[400],
    codeBackground: theme?.colors.slate[900],
    dividers: theme?.colors.stone[800],
    blockquote: theme?.colors.slate[400],
    blockquoteBorder: theme?.colors.slate[800],
  },
};

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
  return chroma.contrast(color, COLORS.light.background);
  // const whiteLum = 1.05;
  // const textLum = luminance(color);
  // return whiteLum / textLum;
}

function blackContrast(color: string | chroma.Color) {
  return chroma.contrast(color, COLORS.dark.background);
  // const blackLum = 0.05;
  // const textLum = luminance(color);
  // return textLum / blackLum;
}

function colorsToCSS() {
  const cssObj = Object.entries(COLORS).reduce((acc, [mode, colors]) => {
    acc[`.theme-${mode}`] = Object.entries(colors).reduce(
      (acc, [key, value]) => {
        return {
          ...acc,
          [`--dd-col-${_.kebabCase(key)}`]: chroma(value).rgb().join(" "),
        };
      },
      {}
    );

    return acc;
  }, {});

  postcss()
    .process(cssObj, { parser: postcssJs })
    .then((result) => {
      console.log(result.css);
    });
}

export default function TestPage() {
  const [contrastMode, setContrastMode] = useState<ContrastMode>("black");
  const [previewMode, setPreviewMode] = useState<PreviewMode>("swatches");

  const currentColors = contrastMode === "white" ? COLORS.light : COLORS.dark;

  console.log(colorsToCSS());

  const cssVars = Object.entries(currentColors).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [`--test-${key}`]: value,
    }),
    {}
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
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className=" flex flex-wrap gap-4">
              {Object.keys(currentColors).map((key) => {
                const color = currentColors[key as keyof typeof currentColors];

                return <Swatch key={key} name={key} color={color} />;
              })}
            </div>
          </div>

          <div
            className="bg-[--test-background] text-[--test-text] p-6 flex flex-col items-center [&_.post-header_h1]:text-[--test-boldText] [&_.post-header__subtitle]:text-[--test-lightText]"
            style={{
              ...cssVars,
            }}
          >
            <PostHeader
              title="Test Post"
              subtitle="Colors have their own sort of logic."
              date="2023-04-01T04:00:00Z"
            />
            <div className="prose text-[--test-text] prose-headings:text-[--test-boldText] prose-blockquote:text-[--test-blockquote] prose-blockquote:border-[--test-blockquoteBorder] prose-a:text-[--test-link] prose-strong:text-[--test-boldText] prose-code:text-[--test-code] prose-hr:border-[--test-dividers] prose-figcaption:text-[--test-lightText] [&>pre>code]:bg-[--test-codeBackground]">
              <TestContent />
            </div>
          </div>
        </div>
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

const Swatch = ({ color, name }: { color: string; name: string }) => {
  const { contrastMode } = useContext(ThemeContext);

  const lum = luminance(color);
  const contrast = {
    white: whiteContrast(color),
    black: blackContrast(color),
  };

  const classcolor = clsx(
    "w-32 h-32",
    contrast.white > contrast.black ? "text-white" : "text-black"
  );

  return (
    <div className={classcolor}>
      <div className="p-2 rounded" style={{ backgroundColor: color }}>
        <div>{name}</div>
        <div>{color}</div>
      </div>
      <div className="text-xs p-2" style={{ color: color }}>
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
};

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
              return <Swatch key={key} name={key} color={value} />;
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
