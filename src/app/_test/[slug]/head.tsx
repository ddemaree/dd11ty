// app/head.js
import { DEFAULT_META, postMeta } from "@lib/meta";
import { getSinglePost } from "@lib/wordpress";
import { NextSeo } from "next-seo";

export default async function Head({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const { post } = await getSinglePost(slug);

  if (post) {
    return <NextSeo {...postMeta(post)} useAppDir={true} />;
  }
}
