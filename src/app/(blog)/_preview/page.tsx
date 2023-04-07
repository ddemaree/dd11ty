import { getPreviewPost, type WordpressPost } from "@lib/wordpress";
import transformGutenberg from "@lib/wordpress/transformGutenberg";

import FooterOrnament from "@components/FooterOrnament";
import { VStack } from "@components/Layout";
import PostHeader from "@components/PostHeader";
import Prose from "@components/Prose";
import RefreshPreview from "./RefreshPreview";

export const dynamic = "force-dynamic";
export const fetchCache = "default-no-store";

// "/_preview?parent=:parentId&id=:id&type=:type&status=:status&n=:nonce",
interface PreviewSearchParams {
  parent: string;
  id: string;
  type: string;
  status: string;
  n: string;
  h?: string;
}

export default async function PreviewPost({
  searchParams,
}: {
  searchParams: PreviewSearchParams;
}) {
  const {
    parent,
    id,
    type,
    status: _status,
    n: nonce,
    h: hostname,
  } = searchParams;
  let post: WordpressPost | undefined;

  if (_status === "revision") {
    post = await getPreviewPost(parent, id, hostname);
  } else {
    post = await getPreviewPost(id, 0, hostname);
  }

  if (!post) throw new Error("POOP");

  const {
    title,
    content: _content,
    excerpt: subtitle,
    date,
    status,
  } = post as WordpressPost;

  const content = await transformGutenberg(_content);
  if (!content) throw new Error("No content returned");

  return (
    <>
      <div className="bg-yellow-300 text-center font-semibold text-[1.25rem] py-3 sticky top-0 z-50">
        Preview Mode
      </div>
      <VStack as="article">
        <PostHeader
          isDraft={status !== "publish"}
          {...{ title, date, subtitle }}
        />
        <Prose content={content} />
        <FooterOrnament />
        {/* <RefreshPreview id={post.databaseId} /> */}
      </VStack>
    </>
  );
}
