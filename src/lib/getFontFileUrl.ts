export default function getFontFileURL(name: string) {
  const filePath = `../../public/fonts/${name}`;
  const fileUrl = new URL(filePath, import.meta.url);
  return fileUrl;
}
