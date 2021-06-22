import { gql } from '@apollo/client'
import { faClock } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DateTime } from 'luxon'
import client from '../../apollo-client'

import Layout from '../../components/Layout'

const PostPage = ({ post: { title, subtitle, content, excerpt, date, ...post} }) => {

  const displaySubtitle = (subtitle || excerpt)
  const dateObj = DateTime.fromISO(date)

  return <Layout>
    <main>
      <article className="dd-prose py-8">
        <header className="py-4">
          <h1 className="dd-title">{title}</h1>
          {displaySubtitle && <p className="text-xl text-ink-medium">{displaySubtitle}</p>}
          <p className="mt-4 text-base text-ink-medium font-medium">
            <FontAwesomeIcon icon={faClock} size="sm" />
            {" "}
            {dateObj.toLocaleString(DateTime.DATE_FULL)}
          </p>
        </header>

        <div
          className="dd-prose mb-8" 
          dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    </main>
  </Layout>
}

export default PostPage

export async function getStaticProps({ params }) {
  const { slug } = params

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

  return {
    props: { 
      post: {
        ...post,
        ...post.postFields,
        ...post.linkFields
      }
    },
  }
}

export async function getStaticPaths() {
  let variables = {
    startCursor: ""
  }

  const query = gql`
    query PathsQuery($startCursor: String) {
      posts(first: 100, after: $startCursor) {
        nodes {
          slug
        }
      }
    }
  `

  const { data: { posts } } = await client.query({ query, variables })

  const paths = posts.nodes.map(({ slug }, index) => {
    let nextNode, previousNode;

    if(index > 0) {
      nextNode = posts.nodes[index - 1]
    }

    previousNode = posts.nodes[index + 1]

    return {
      params: {
        slug,
        nextSlug: (nextNode && nextNode.slug),
        previousSlug: (previousNode && previousNode.slug)
      }
    }
  })

  return {
    paths,
    fallback: false,
  };
}