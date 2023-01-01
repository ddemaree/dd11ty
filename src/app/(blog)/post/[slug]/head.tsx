import DescriptionTags from "@components/head/Description";
import SocialImageTags from "@components/head/SocialImage";
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

  return (
    <>
      <title>{`${title} • David Demaree's blog`}</title>
      <TitleTag title={`${title} • David Demaree's blog`} />
      <DescriptionTags description={subtitle} />
      <DefaultHeadTags />
      <SocialImageTags slug={slug} />
    </>
  );
}
