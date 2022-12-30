export default function TitleTag({ title }: { title: string }) {
  return (
    <>
      <meta name="title" content={title} />
      <meta property="og:title" content={title} />
      <meta name="twitter:title" content={title} />
    </>
  );
}
