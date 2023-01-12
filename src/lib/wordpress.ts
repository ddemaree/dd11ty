import {
  ApolloClient,
  DocumentNode,
  InMemoryCache,
  gql,
  TypedDocumentNode,
  createHttpLink,
} from "@apollo/client";

import fetch from "cross-fetch";

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

const cache = new InMemoryCache();

const httpLink = createHttpLink({
  uri: "https://wp.demaree.me/graphql",
  // fetch,
  useGETForQueries: true,
});

const client = new ApolloClient({
  link: httpLink,
  cache,
  name: "demaree-dot-me",
  version: "1.3",
  // ssrMode: true,
});

async function makeGQLRequest(
  query: string | DocumentNode | TypedDocumentNode,
  variables: any
) {
  if (typeof query === "string") {
    query = gql(query);
  }

  return client.query({ query, variables });
}

const BASIC_POST_FIELDS = gql`
  fragment BasicPostFields on Post {
    databaseId
    slug
    title
    date: dateGmt
    excerpt: rawExcerpt
    featuredImage {
      node {
        databaseId
        sourceUrl
        srcSet
        sizes
        altText
        caption
        cloudinaryId
        mediaDetails {
          height
          width
        }
      }
    }
  }
`;

const SINGLE_POST_QUERY = gql`
  ${BASIC_POST_FIELDS}
  query PostQuery($id: ID!) {
    post(id: $id, idType: SLUG) {
      ...BasicPostFields
      content
    }
  }
`;

const ALL_POSTS_QUERY = gql`
  ${BASIC_POST_FIELDS}
  query PostsQuery($startCursor: String, $numPosts: Int) {
    posts(
      first: $numPosts
      after: $startCursor
      where: { status: PUBLISH, dateQuery: { after: { year: 2015 } } }
    ) {
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        ...BasicPostFields
      }
    }
  }
`;

export async function getAllPosts(
  numPosts: number = 100
): Promise<WordpressPost[]> {
  const gqlResponse = await makeGQLRequest(ALL_POSTS_QUERY, { numPosts });
  const { data } = gqlResponse;

  const {
    posts: { nodes: postObjs },
  } = data;

  return postObjs.map((p: any) => wrapWordpressPost(p)) as WordpressPost[];
}

export async function getSinglePost(
  slug: string | number
): Promise<WordpressResponse> {
  const gqlResult = await makeGQLRequest(SINGLE_POST_QUERY, { id: slug });

  const {
    data: { post: postData },
  } = await gqlResult;

  if (!postData) {
    return {
      status: 200,
      error: `No post found with slug '${slug}'`,
      post: null,
    };
  }

  const post = wrapWordpressPost(postData);

  return {
    status: 200,
    post,
  };
}
