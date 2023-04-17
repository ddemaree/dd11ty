import type { ResolvedMetadata } from "@/types/metadata";
import { Meta } from "./Meta";

export interface Props {
  openGraph: ResolvedMetadata["openGraph"];
}

function getTypedOpenGraph(openGraph: Props["openGraph"]) {
  if (!openGraph) return "";

  let typedOpenGraph;
  if ("type" in openGraph) {
    switch (openGraph.type) {
      case "website":
        typedOpenGraph = <Meta property="og:type" content="website" />;
        break;
      case "article":
        typedOpenGraph = (
          <>
            <Meta property="og:type" content="article" />
            <Meta
              property="article:published_time"
              content={openGraph.publishedTime?.toString()}
            />
            <Meta
              property="article:modified_time"
              content={openGraph.modifiedTime?.toString()}
            />
            <Meta
              property="article:expiration_time"
              content={openGraph.expirationTime?.toString()}
            />
            <Meta property="article:author" content={openGraph.authors} />
            <Meta property="article:section" content={openGraph.section} />
            <Meta property="article:tag" content={openGraph.tags} />
          </>
        );
        break;
    }
  }

  return typedOpenGraph;
}

export default function OpenGraphMetadata({ openGraph }: Props) {
  if (!openGraph) return null;

  return (
    <>
      <Meta property="og:determiner" content={openGraph.determiner} />
      <Meta property="og:title" content={openGraph.title?.absolute} />
      <Meta property="og:description" content={openGraph.description} />
      <Meta property="og:url" content={openGraph.url?.toString()} />
      <Meta property="og:site_name" content={openGraph.siteName} />
      <Meta property="og:locale" content={openGraph.locale} />
      <Meta property="og:country_name" content={openGraph.countryName} />
      <Meta property="og:ttl" content={openGraph.ttl?.toString()} />
      {getTypedOpenGraph(openGraph)}
    </>
  );
}
