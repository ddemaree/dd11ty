import Link from 'next/link'
import { MdStore } from '../../lib/getPosts'
import SiteLayout from '../../components/SiteLayout'
import Dateline from '../../components/Dateline'
import _ from 'lodash'
import { createPaginator } from '../../components/Pagination'

export default function HomePage({ posts, pageNum, totalPages }) {
  const { PreviousPage, NextPage, Wrapper } = createPaginator(pageNum, totalPages)

  return <>
    <SiteLayout>
      <h1 className='text-2xl'>All blog posts</h1>
      {posts.map(post => <article key={post.slug}>
        <Link href={`/p/${post.slug}`}>
          <a className='font-sans font-medium no-underline'>{post.title}</a>
        </Link>
        <Dateline date={post.date} className="font-medium text-base block" />
      </article>)}

      <Wrapper className="mt-12">
        <PreviousPage />
        <NextPage />
      </Wrapper>
    </SiteLayout>
  </>
}

export async function getStaticPaths() {
  const { getPosts } = MdStore()
  const { totalPages } = getPosts()

  let paths = []
  for(let page = 1; page <= totalPages; page++) {
    paths.push({ params: { page: (page === 1 ? null : [`${page}`]) } })
  }

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params: { page } }) {
  const { getPosts } = MdStore('./content')
  const pageNum = page ? Number(page[0]) : 1;
  const { posts, totalPages } = getPosts({ page: pageNum, fields: ['title', 'date', 'slug'] })

  return {
    props: {
      posts,
      pageNum,
      totalPages
    }
  }
}