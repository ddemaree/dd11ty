export type WordpressImage = {
  sourceUrl: string;
  srcSet: string;
  sizes: string;
  caption: string;
  altText: string;
};

export type WordpressPost = {
  slug: string;
  title: string;
  date: string;
  content: string;
  excerpt: string;
  featuredImage?: WordpressImage;
};

export type WordpressResponse = {
  status: number;
  post: WordpressPost | null;
  error?: string;
};

function wrapWordpressPost(inputPostData: any): WordpressPost {
  const { slug, title, content, date, excerpt, ...postData } = inputPostData;

  const featuredImage = postData?.featuredImage?.node;

  const post: WordpressPost = {
    slug,
    title,
    content,
    date,
    excerpt,
    featuredImage,
  };

  return post;
}

async function makeGQLRequest(
  query: string,
  variables: any
): Promise<Response> {
  const password = process.env.WP_PASSWORD;
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
      slug
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

const ALL_POSTS_QUERY = `
query PostsQuery($startCursor: String) {
  posts(
    first: 100
    after: $startCursor
    where: {status: PUBLISH, dateQuery: {after: {year: 2015}}}
  ) {
    pageInfo {
      endCursor
      hasNextPage
    }
    nodes {
      slug
      title
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
}
`;

export async function getAllPosts(): Promise<WordpressPost[]> {
  const gqlResponse = await makeGQLRequest(ALL_POSTS_QUERY, {});
  const { status } = gqlResponse;
  const { data } = await gqlResponse.json();

  const {
    posts: { nodes: postObjs },
  } = data;

  return postObjs.map((p: any) => wrapWordpressPost(p)) as WordpressPost[];
}

export async function getSinglePost(
  slug: string | number
): Promise<WordpressResponse> {
  const gqlResponse = await makeGQLRequest(SINGLE_POST_QUERY, { id: slug });

  const { status } = gqlResponse;
  const {
    data: { post: postData },
  } = await gqlResponse.json();

  if (!postData || status != 200) {
    return {
      status,
      error: `No post found with slug '${slug}'`,
      post: null,
    };
  }

  const post = wrapWordpressPost(postData);

  return {
    status,
    post,
  };
}
