import { gql } from '@apollo/client'
import client from '../apollo-client'
import _ from 'lodash'
import { AssetCache } from "@11ty/eleventy-cache-assets"

function normalizePost(post) {
  return {
    ...post,
    ...post.postFields,
    ...post.linkFields
  }
}

const FULL_POST_FIELDS = gql`
fragment FullPostFields on Post {
  slug
  databaseId
  title
  content
  excerpt: unencodedExcerpt
  date: dateGmt
  postFields {
    subtitle
  }
  linkFields {
    linkUrl
  }
}
`

export async function getSinglePost(slug) {
  let asset = new AssetCache(ASSET_CACHE_KEY)

  // check if the cache is fresh within the last day
  if(asset.isCacheValid("1d")) {
    // return cached data.
    const allPosts = await asset.getCachedValue(); // a promise

    let _post = _.find(allPosts, p => (p.slug === slug))
    return {
      props: {
        post: normalizePost(_post)
      }
    }
  }

  const query = gql`
  ${FULL_POST_FIELDS}
  query SinglePostQuery($slug: String) {
    post: postBy(slug: $slug) {
      ...FullPostFields
    }
  }
  `

  const { data: { post } } = await client.query({ query, variables: { slug }})

  return normalizePost(post)
}

const ASSET_CACHE_KEY = "wpPosts_demareeblog_wpengine_com"

export async function getAllPosts() {
  let asset = new AssetCache(ASSET_CACHE_KEY)

  // check if the cache is fresh within the last day
  if(asset.isCacheValid("1d")) {
    // return cached data.
    return asset.getCachedValue(); // a promise
  }

  let startCursor = ""
  let hasNextPage;
  let result;
  let currentSet;
  let posts = [];

  const query = gql`
    ${FULL_POST_FIELDS}
    query PathsQuery($startCursor: String) {
      posts(first: 100, after: $startCursor) {
        pageInfo {
          endCursor
          hasNextPage
        }
        nodes {
          ...FullPostFields
        }
      }
    }
  `

  do {
    result = await client.query({ query, variables: { startCursor } })

    if(result.data) {
      const { pageInfo, nodes } = result.data.posts
      startCursor = pageInfo.endCursor
      hasNextPage = pageInfo.hasNextPage
      // currentSet = nodes.map(({ slug, databaseId }) => ({slug, databaseId}))
      posts = _.concat(posts, nodes)
    }
    else {
      hasNextPage = false
    }

  } while(hasNextPage)

  posts = posts.map((p, index) => {
    let previousPost, nextPost;

    if(index > 0) {
      previousPost = posts[index - 1]
    }

    nextPost = posts[index + 1]

    return {
      ...p,
      previousPost,
      nextPost
    }
  })

  await asset.save(posts, "json")
  return posts
}

export async function getPostPaths() {
  const posts = await getAllPosts()

  return posts.map(p => ({
    params: {
      slug: p.slug,
      previousSlug: (p.previousPost && p.previousPost.slug),
      nextPost: (p.nextPost && p.nextPost.slug)
    }
  }))
}