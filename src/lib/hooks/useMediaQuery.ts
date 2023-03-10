import * as React from "react";

export default function useMediaQuery(query, defaultMatchState = null) {
  const [mqMatches, setMqMatches] = React.useState(defaultMatchState);
  const mq = React.useRef(null);

  React.useEffect(
    function () {
      mq.current = window.matchMedia(query);
      setMqMatches(mq.current.matches);

      const onMqChange = (mqEvt) => setMqMatches(mqEvt.matches);

      mq.current.addEventListener("change", onMqChange);
      return () => mq.current.removeEventListener("change", onMqChange);
    },
    [query]
  );

  return mqMatches;
}
