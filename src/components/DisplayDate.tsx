import { DateTime } from "luxon";

export default function DisplayDate({
  dateString,
  className,
}: {
  dateString: string;
  className?: string;
}) {
  const dt = DateTime.fromISO(dateString).setZone("America/New_York");

  const formattedDate = dt.toLocaleString(DateTime.DATE_FULL);

  return (
    <time className={className} dateTime={dateString}>
      {formattedDate}
    </time>
  );
}
