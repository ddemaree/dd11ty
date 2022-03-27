import { serialize } from 'next-mdx-remote/serialize'
import { MdStore } from '../../lib/getPosts'
import { MDXRemote } from 'next-mdx-remote'
import SiteLayout from '../../components/SiteLayout'
import MarkdownIt from 'markdown-it'
import markdownItAttrs from 'markdown-it-attrs'

export default function SinglePost({ post, mdxSource, html }) {
  return <>
    <SiteLayout>
      <h1>{ post.title }</h1>
      {mdxSource && <MDXRemote {...mdxSource} />}
      {html && <div dangerouslySetInnerHTML={{__html: html}} />}
    </SiteLayout>
  </>
}

export function getStaticPaths() {
  const { getAllPosts } = MdStore()
  const allPosts = getAllPosts({ fields: [ 'slug' ], includeDrafts: true })
  return {
    paths: allPosts.map(p => ({ params: { slug: p.slug } })),
    fallback: false
  }
}

export async function getStaticProps({ params: { slug } }) {
  const md = MarkdownIt()
  md.use(markdownItAttrs)

  const { getPost } = MdStore()
  const { content, ...post } = getPost(slug)
  let mdxSource = null;
  let html = null;

  if(post.format === 'mdx') {
    mdxSource = await serialize(content)
  }
  else {
    html = md.render(content)
  }

  return {
    props: {
      post,
      mdxSource,
      html
    }
  }
}