import type { ResolvedMetadata } from "@/types/metadata";
import { Meta } from "./Meta";

export interface Props {
  twitter: ResolvedMetadata["twitter"];
}

export default function TwitterMetadata({ twitter }: Props) {
  if (!twitter) return null;
  const { card } = twitter;

  return (
    <>
      <Meta name="twitter:card" content={card} />
      <Meta name="twitter:site" content={twitter.site} />
      <Meta name="twitter:site:id" content={twitter.siteId} />
      <Meta name="twitter:creator" content={twitter.creator} />
      <Meta name="twitter:creator:id" content={twitter.creatorId} />
      <Meta name="twitter:title" content={twitter.title?.absolute} />
      <Meta name="twitter:description" content={twitter.description} />
      <Meta name="twitter:image" content={twitter.images} />
    </>
  );
}
