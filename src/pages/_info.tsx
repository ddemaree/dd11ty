import getSiteUrl from "@lib/getSiteUrl";

export default function DebugInfoPage({
  url,
  siteUrl,
}: {
  url: string;
  siteUrl: string;
}) {
  return (
    <>
      <div>
        URL:
        {url}
      </div>
      <div>Site URL: {siteUrl}</div>
    </>
  );
}

export function getServerSideProps() {
  const siteUrl = getSiteUrl();

  return {
    props: {
      siteUrl,
    },
  };
}
