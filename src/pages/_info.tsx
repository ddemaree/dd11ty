export default function DebugInfoPage({ url }: { url: string }) {
  return (
    <>
      <div>
        URL:
        {url}
      </div>
    </>
  );
}

export function getServerSideProps() {
  const port = process.env.PORT || "3000";
  const url = process.env.VERCEL_URL || `http://localhost:${port}`;

  console.log({ port, url });

  return {
    props: {
      url,
    },
  };
}
