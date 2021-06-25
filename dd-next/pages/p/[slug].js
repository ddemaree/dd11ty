import { faClock } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DateTime } from 'luxon'

import Layout from '../../components/Layout'
import { getPostPaths, getSinglePost } from '../../lib/wordpress'

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
  const post = await getSinglePost(slug)

  return {
    props: { 
      post
    },
  }
}

export async function getStaticPaths() {
  const paths = await getPostPaths()

  return {
    paths,
    fallback: false,
  };
}