export default function deorphanText(elemText: string) {
  const words = elemText.split(" ");
  if (words.length <= 2) return [elemText];

  const newString = words.slice(0, -2).join(" ");
  const secondString = words.slice(-2).join(" ");
  return [newString, secondString];
}
