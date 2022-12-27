// `app/page.js` is the UI for the root `/` URL

// import sanitizeHtml from "@lib/sanitizeHtml";
import sanitizeHtml from "@lib/sanitizeHtml";
import { getSinglePost, WordpressPost } from "@lib/wordpress";
import PostHeader from "./PostHeader";

export default async function BlogPostPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const { error, post } = await getSinglePost(slug);
  const {
    title,
    content,
    excerpt: subtitle,
    date,
    featuredImage,
  } = post as WordpressPost;

  const cleanContent = sanitizeHtml(content);

  return (
    <article>
      <PostHeader {...{ title, date, subtitle, image: featuredImage }} />
      <main
        className="mt-12 prose prose-lg prose-grid font-serif prose-figcaption:font-sans font-normal dark:text-slate-100"
        dangerouslySetInnerHTML={{ __html: cleanContent }}
      />
    </article>
  );
}
