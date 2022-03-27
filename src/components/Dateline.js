import { DateTime } from "luxon"

export default function Dateline({ date, as = 'time', ...props }) {
  const Tag = as
  const dateType = typeof date
  const dateObj = (dateType === 'string') ? DateTime.fromISO(date) : DateTime.fromJSDate(date)

  if(Tag === 'time') {
    props.dateTime = dateObj.toISODate()
  }

  return <Tag {...props}>{dateObj.toLocaleString(DateTime.DATE_MED)}</Tag>
}