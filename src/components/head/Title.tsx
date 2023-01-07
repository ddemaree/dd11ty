export default function SEOTitleTag({ title }: { title: string }) {
  return <>{seoTitleTags(title)}</>;
}

export function seoTitleData(content: string) {
  return [
    { name: "title", content },
    { property: "og:title", content },
    { name: "twitter:title", content },
  ];
}

export function seoTitleTags(title: string) {
  return seoTitleData(title).map((c, x) => <meta key={x} {...c} />);
}
