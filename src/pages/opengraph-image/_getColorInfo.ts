import chroma from "chroma-js";

export default function getColorInfo(
  color: string | number | number[] | chroma.Color
) {
  const out = { textColor: "#ffffff" };

  const _col = chroma(color as chroma.Color);
  const luminance = _col.luminance();
  const wContrast = chroma.contrast("#ffffff", _col);
  const bContrast = chroma.contrast("#000000", _col);

  if (bContrast > wContrast) {
    out.textColor = "#000000";
  }

  return Object.assign(out, {
    luminance,
    wContrast,
    bContrast,
    color: _col.hex(),
  });
}
