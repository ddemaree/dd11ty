import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import htmlToReact from "@lib/text/htmlToReact";
import sanitizeHtml from "@lib/text/sanitizeHtml";
import extractTweetIds from "@lib/twitter/extractTweetIds";
import fetchTweets from "@lib/twitter/fetchTweets";
import { getSinglePost, WordpressPost } from "@lib/wordpress";
import PostHeader from "@components/PostHeader";
// import { Helmet } from "react-helmet";
// import { getSocialImageData } from "@components/head/SocialImage";
// import { seoDescriptionData } from "@components/head/Description";

export default function BlogPostPage({
  post,
  cleanContent,
  tweets,
  slug,
}: {
  post: WordpressPost;
  tweets: Tweet[];
  cleanContent: string;
  slug: string;
}) {
  const { title, content, excerpt: subtitle, date, featuredImage } = post;

  const reactContent = htmlToReact(cleanContent, tweets);

  return (
    <article>
      {/* <Helmet
        title={`${title} • demaree.me`}
        meta={[
          ...getSocialImageData({ slug }),
          ...seoDescriptionData(subtitle || "A blog post by David Demaree"),
        ]}
      /> */}
      <PostHeader {...{ title, date, subtitle, image: featuredImage }} />
      <main className="mt-12 prose prose-lg prose-grid font-serif prose-figcaption:font-sans font-normal dark:text-slate-100">
        {reactContent}
      </main>
    </article>
  );
}

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  const { slug } = params as { slug: string };
  const { error, post } = await getSinglePost(slug);

  // TODO: Handle 404
  if (!post) {
    return {
      notFound: true,
    };
  }

  const cleanContent = sanitizeHtml(post.content);
  const tweetIds = extractTweetIds(cleanContent);
  const tweets = await fetchTweets(tweetIds);

  return {
    props: {
      slug,
      error: error ?? null,
      post,
      cleanContent,
      tweetIds,
      tweets,
    },
  };
}
