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
