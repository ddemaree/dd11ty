export default async function fetchFontFile(name = ""): Promise<ArrayBuffer> {
  const filePath = `../../public/fonts/${name}`;
  const fileUrl = new URL(filePath, import.meta.url);

  console.log({
    filePath,
    fileUrl: fileUrl.toString(),
    baseurl: import.meta.url,
  });

  return fetch(fileUrl).then((res) => res.arrayBuffer());
}
