import DescriptionTags from "@components/head/Description";
import TitleTag from "@components/head/Title";
import { getSinglePost, WordpressPost } from "@lib/wordpress";
import DefaultHeadTags from "src/app/DefaultHeadTags";

export default async function Head({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const { post } = await getSinglePost(slug);
  const { title, excerpt: subtitle, featuredImage } = post as WordpressPost;

  const socialImageUrl = `/api/og-image?title=${encodeURIComponent(
    title.replace(/ /g, "_").replace(/'/g, "%27")
  )}&t=${Date.now()}`;

  return (
    <>
      <title>{`${title} • David Demaree's blog`}</title>
      <TitleTag title={`${title} • David Demaree's blog`} />
      <DescriptionTags description={subtitle} />
      <DefaultHeadTags />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:image" content={socialImageUrl} />
      <meta name="twitter:image" content={socialImageUrl} />
    </>
  );
}
