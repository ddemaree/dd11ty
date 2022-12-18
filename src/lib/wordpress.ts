export type WordpressImage = {
  sourceUrl: string;
  srcSet: string;
  sizes: string;
  caption: string;
  altText: string;
};

export type WordpressPost = {
  title: string;
  date: string;
  content: string;
  excerpt: string;
  featuredImage?: WordpressImage;
};

export type WordpressResponse = {
  status: number;
  post: WordpressPost;
};

async function makeGQLRequest(
  query: string,
  variables: any
): Promise<Response> {
  const password = import.meta.env.WP_PASSWORD;
  const authString = Buffer.from("ddemaree" + ":" + password).toString(
    "base64"
  );

  return fetch("https://demareedotme.wpengine.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${authString}`,
    },
    body: JSON.stringify({ query, variables }),
  });
}

const SINGLE_POST_QUERY = `
  query PostQuery($id: ID!) {
    post(id: $id, idType: SLUG) {
      title
      date: dateGmt
      content
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

export async function getSinglePost(
  slug: string | number
): Promise<WordpressResponse> {
  const gqlResponse = await makeGQLRequest(SINGLE_POST_QUERY, { id: slug });

  const { status } = gqlResponse;
  const {
    data: { post: postData },
  } = await gqlResponse.json();

  const {
    title,
    content,
    date,
    excerpt,
    featuredImage: { node: featuredImage },
  } = postData;

  const post: WordpressPost = {
    title,
    content,
    date,
    excerpt,
    featuredImage,
  };

  return {
    status,
    post,
  };
}
