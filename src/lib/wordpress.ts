export type WordpressImage = {
  databaseId: number | string;
  sourceUrl: string;
  srcSet: string;
  sizes: string;
  caption: string;
  altText: string;
  cloudinaryId?: string;
  width: number | null;
  height: number | null;
};

export type WordpressPost = {
  databaseId: number | string;
  slug: string;
  title: string;
  date: string;
  content: string;
  excerpt: string;
  featuredImage?: WordpressImage | null;
};

export type WordpressResponse = {
  status: number;
  post: WordpressPost | null;
  error?: string;
};

function wrapWordpressImage(inputImage: any): WordpressImage | null {
  if (!inputImage) return null;

  const { width, height } = inputImage?.mediaDetails || {
    width: null,
    height: null,
  };

  const outputImage: WordpressImage = {
    databaseId: inputImage.databaseId,
    sourceUrl: inputImage.sourceUrl,
    srcSet: inputImage.srcSet,
    sizes: inputImage.sizes,
    caption: inputImage.caption,
    altText: inputImage.altText,
    cloudinaryId: inputImage.cloudinaryId,
    width,
    height,
  };

  return outputImage;
}

function wrapWordpressPost(inputPostData: any): WordpressPost {
  const { databaseId, slug, title, content, date, excerpt, ...postData } =
    inputPostData;

  const featuredImage = postData?.featuredImage?.node;

  const post: WordpressPost = {
    databaseId,
    slug,
    title,
    date,
    excerpt,
    featuredImage: wrapWordpressImage(featuredImage),
    content: inputPostData?.content ?? null,
  };

  return post;
}

async function makeGQLRequest(
  query: string,
  variables: any
): Promise<Response> {
  const password = process.env.NEXT_PUBLIC_WP_PASSWORD;
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
      databaseId
      slug
      title
      date: dateGmt
      content
      excerpt(format: RAW)
      featuredImage {
        node {
          databaseId
          sourceUrl
          srcSet
          sizes
          altText
          caption(format: RAW)
          cloudinaryId
          mediaDetails {
            height
            width
          }
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
      databaseId
      slug
      title
      date: dateGmt
      excerpt(format: RAW)
      featuredImage {
        node {
          databaseId
          sourceUrl
          srcSet
          sizes
          altText
          caption(format: RAW)
          cloudinaryId
          mediaDetails {
            height
            width
          }
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
  } = await gqlResponse
    .json()
    .catch((err) => console.error(err, status, gqlResponse));

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
