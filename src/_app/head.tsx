import SocialImageTags from "@components/head/SocialImage";
import DefaultHeadTags from "./DefaultHeadTags";

export default function Head() {
  return (
    <>
      <title>⚡️ David Demaree • Internet Person &amp; Product Leader</title>
      <meta name="title" content="David Demaree's home page" />
      <meta name="description" content="A good man, and thorough." />
      <DefaultHeadTags />
      <SocialImageTags />
    </>
  );
}
