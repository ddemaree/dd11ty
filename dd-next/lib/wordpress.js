import { gql } from '@apollo/client'
import client from '../apollo-client'
import _ from 'lodash'

function normalizePost(post) {
  return {
    ...post,
    ...post.postFields,
    ...post.linkFields
  }
}

export async function getSinglePost(slug) {
  const query = gql`
  query SinglePostQuery($slug: String) {
    post: postBy(slug: $slug) {
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
  }
  `

  const { data: { post } } = await client.query({ query, variables: { slug }})

  return normalizePost(post)
}

export async function getPostPaths() {

  let startCursor = ""
  let variables = {
    startCursor
  }

  let hasNextPage;
  let result;
  let currentSet;
  let posts = [];

  const query = gql`
    query PathsQuery($startCursor: String) {
      posts(first: 100, after: $startCursor) {
        pageInfo {
          endCursor
          hasNextPage
        }
        nodes {
          slug
        }
      }
    }
  `

  do {
    result = await client.query({ query, variables })

    if(result.data) {
      const { pageInfo, nodes } = result.data.posts
      startCursor = pageInfo.endCursor
      hasNextPage = pageInfo.hasNextPage

      currentSet = nodes.map(({ slug }, index) => {
        let nextNode, previousNode;

        // if(index > 0) {
        //   nextNode = posts.nodes[index - 1]
        // }

        // previousNode = posts.nodes[index + 1]

        return {
          params: {
            slug,
            nextSlug: (nextNode && nextNode.slug),
            previousSlug: (previousNode && previousNode.slug)
          }
        }
      })

      posts = _.concat(posts, currentSet)
    }
    else {
      hasNextPage = false
    }

  } while(hasNextPage)

  return posts
}