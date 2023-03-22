import Prose from "@components/Prose";
import { getPreviewPost, type WordpressPost } from "@lib/wordpress";
import transformGutenberg from "@lib/wordpress/transformGutenberg";
import PostHeader from "../post/[slug]/PostHeader";

export const fetchCache = "default-no-store";

// "/_preview?parent=:parentId&id=:id&type=:type&status=:status&n=:nonce",
interface PreviewSearchParams {
  parent: string;
  id: string;
  type: string;
  status: string;
  n: string;
}

export default async function PreviewPost({
  searchParams,
}: {
  searchParams: PreviewSearchParams;
}) {
  const { parent, id, type, status: _status, n: nonce } = searchParams;
  let post: WordpressPost | undefined;

  if (_status === "revision") {
    post = await getPreviewPost(parent, id, nonce);
  } else {
    post = await getPreviewPost(id, 0, "");
  }

  if (!post) throw new Error("POOP");

  const {
    title,
    content: _content,
    excerpt: subtitle,
    date,
    featuredImage,
    status,
  } = post as WordpressPost;

  const content = await transformGutenberg(_content);
  if (!content) throw new Error("No content returned");

  return (
    <article>
      <PostHeader
        isDraft={status !== "publish"}
        {...{ title, date, subtitle }}
      />
      <Prose content={content.toString("utf-8")} />
    </article>
  );
}
