const { ApolloClient, InMemoryCache, HttpLink, gql } = require('@apollo/client/core')
const { JSDOM } = require('jsdom')
const fetch = require('cross-fetch')
const { DateTime } = require('luxon')
const {AssetCache} = require("@11ty/eleventy-cache-assets");

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache: cache,
  link: new HttpLink({ uri: 'https://demareeblog.wpengine.com/graphql', fetch })
});

const query = gql`
fragment TaxonomyFields on TermNode {
  databaseId
  name
  slug
}

query MyQuery($startCursor: String) {
  posts(first: 100, after: $startCursor) {
    pageInfo {
      endCursor
      hasPreviousPage
      hasNextPage
    }
    nodes {
      title
      content
      slug
      excerpt: unencodedExcerpt
      date: dateGmt
      postFields {
        subtitle
        primaryTag {
          ...TaxonomyFields
        }
      }
      linkFields {
        linkUrl
      }
      databaseId
      featuredImage {
        node {
          srcSet
        }
      }
      tags {
        nodes {
          ...TaxonomyFields
        }
      }
      categories {
        nodes {
          ...TaxonomyFields
        }
      }
    }
  }
}
`

const processPostNode = node => {
  node.content.replace(/demareeblog\.wpengine\.com\/wp-content\/uploads/g, 'res.cloudinary.com/demaree/wp')
  const newNode = {
    ...node,
    fileSlug: node.slug,
    data: {} // mainly here to make various templates shut up
    // date: DateTime.fromISO(node.date),
  }
  // console.log(newNode)
  return newNode
}

async function getWpPosts() {
  let asset = new AssetCache("wpPosts_demareeblog_wpengine_com");

  // check if the cache is fresh within the last day
  if(asset.isCacheValid("1d")) {
    // return cached data.
    return asset.getCachedValue(); // a promise
  }

  let posts = []
  let startCursor = null
  let keepFetching = true
  let result = null

  while(keepFetching) {
    result = await client.query({query, variables: {startCursor}})

    if(result.data) {
      const { pageInfo, nodes } = result.data.posts
      startCursor = pageInfo.endCursor
      keepFetching = pageInfo.hasNextPage
      const postNodes = nodes.map(processPostNode)

      posts = [...posts, ...postNodes]
    }
    else { 
      keepFetching = false
    }
  }

  await asset.save(posts, "json");
  return posts
}

module.exports = getWpPosts