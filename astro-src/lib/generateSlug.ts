import path from "path";

export default function generateSlug(pathname: string): string {
  const pathInfo = path.parse(pathname);
  const dirs = pathInfo.dir.split("/");

  let rawslug;

  if (pathInfo.name === "index" && dirs.length) {
    rawslug = dirs.slice(-1)[0];
  } else {
    rawslug = pathInfo.name;
  }

  let reg = rawslug.match(/\d{4}-\d{2}-\d{2}-(.*)/);
  if (reg) {
    return reg[1];
  } else {
    return rawslug;
  }
}
