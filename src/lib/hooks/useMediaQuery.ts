import * as React from "react";

export default function useMediaQuery(
  query: string,
  defaultMatchState: boolean | null = null
) {
  const [mqMatches, setMqMatches] = React.useState(defaultMatchState);
  const mq = React.useRef<MediaQueryList | null>(null);

  React.useEffect(
    function () {
      mq.current = window.matchMedia(query);
      setMqMatches(mq.current.matches);

      const onMqChange = (mqEvt: MediaQueryListEvent) =>
        setMqMatches(mqEvt.matches);

      mq.current.addEventListener("change", onMqChange);
      return () => mq.current?.removeEventListener("change", onMqChange);
    },
    [query]
  );

  return mqMatches;
}
