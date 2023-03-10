import { WordpressPost } from "./types";
import { gql, gqlRequest } from "./client";
import wrapPost from "./wrapPost";

const SINGLE_POST_QUERY = gql`
  query SinglePostQuery($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      slug
      title
      content
      date: dateGmt
      excerpt(format: RAW)
      featuredImage {
        node {
          sourceUrl
          srcSet
          sizes
          altText
          caption(format: RAW)
        }
      }
    }
  }
`;

export async function getSinglePost(slug: string): Promise<WordpressPost> {
  const gqlResponse = await gqlRequest(SINGLE_POST_QUERY, {
    slug,
  });
  const { data } = gqlResponse;
  const post = data?.post;

  return wrapPost(post);
}

export default getSinglePost;
