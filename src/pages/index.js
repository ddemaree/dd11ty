import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { MdStore } from '../lib/getPosts'
import SiteLayout from '../components/SiteLayout'

export default function HomePage({ post, mdxSource }) {
  return <SiteLayout>
    <h1 className='text-2xl'>{ post.title }</h1>
    <MDXRemote {...mdxSource} />
  </SiteLayout>
}

export async function getStaticProps() {
  const { getPost } = MdStore()
  const { content, ...post } = getPost('_index')

  const mdxSource = await serialize(content)

  return {
    props: {
      post,
      mdxSource
    }
  }
}