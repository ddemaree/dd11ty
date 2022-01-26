import { DateTime } from 'luxon'

interface PostDatelineProps {
  date: string,
  className?: string,
  as?: string
}

export default function PostDateline({ date, className, as: Tag = 'div' } : PostDatelineProps): any {
  const dateObj = DateTime.fromISO(date)

  return <Tag className={className}><time dateTime={date}>{dateObj.toLocaleString(DateTime.DATE_FULL)}</time></Tag>
}