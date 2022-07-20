import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import _cn from 'classnames'

function PageLink({ href, next, previous, className }) {
  return <Link href={href}>
    <a className={_cn('inline-flex gap-2 items-center no-underline', className)}>
      <FontAwesomeIcon icon={previous ? faArrowLeft : faArrowRight} fixedWidth />
      <span className='font-sans'>{`${previous ? 'Newer' : 'Older'} posts`}</span>
    </a>
  </Link>
}

export function createPaginator(currentPage, totalPages) {
  const previousPageNum = currentPage > 1 ? currentPage - 1 : null;
  const nextPageNum = currentPage < totalPages ? currentPage + 1 : null;

  const previousPageUrl = previousPageNum > 1 ? `/posts/${previousPageNum}` : `/posts`
  const nextPageUrl = `/posts/${nextPageNum}`

  return {
    previousPageNum,
    nextPageNum,
    currentPage,
    totalPages,
    NextPage: props => (nextPageNum && <PageLink href={nextPageUrl} next {...props} />),
    PreviousPage: props => (previousPageNum && <PageLink href={previousPageUrl} previous {...props} />),
    Wrapper: ({ children, className }) => (<div className={_cn('flex flex-col sm:flex-row gap-2 py-6', className)}>{ children }</div>)
  }
}