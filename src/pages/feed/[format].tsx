import { GetServerSidePropsContext } from "next";
import { getFeed } from "../../lib/feeds";

interface DDFeedServerSidePropsContext extends GetServerSidePropsContext {
  params: {
    format?: string;
  };
}

export async function getServerSideProps({
  res,
  params: { format = "rss" },
}: DDFeedServerSidePropsContext) {
  const feed = await getFeed();

  res.setHeader(
    "Content-Type",
    format === "json" ? "application/json" : "text/xml"
  );
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=1200, stale-while-revalidate=600"
  );

  if (format === "json") {
    res.write(feed.json1());
  } else {
    res.write(feed.rss2());
  }
  res.end();

  return {
    props: {},
  };
}

export default function Feed() {
  return null;
}
