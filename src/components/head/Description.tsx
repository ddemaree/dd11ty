export default function DescriptionTags({
  description,
}: {
  description: string;
}) {
  return (
    <>
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta name="twitter:description" content={description} />
    </>
  );
}

export function seoDescriptionData(content: string) {
  return [
    { name: "description", content },
    { property: "og:description", content },
    { name: "twitter:description", content },
  ];
}

export function seoDescriptionTags(description: string) {
  return seoDescriptionData(description).map((content, x) => (
    <meta key={x} {...content} />
  ));
}
