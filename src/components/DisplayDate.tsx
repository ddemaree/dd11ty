import { DateTime } from "luxon";

export default function DisplayDate({
  dateString,
  className,
  format = DateTime.DATE_FULL,
}: {
  dateString: string;
  className?: string;
  format?: Intl.DateTimeFormatOptions;
}) {
  const dt = DateTime.fromISO(dateString).setZone("America/New_York");

  const formattedDate = dt.toLocaleString(format);

  return (
    <time className={className} dateTime={dateString}>
      {formattedDate}
    </time>
  );
}
