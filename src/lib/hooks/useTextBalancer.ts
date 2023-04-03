import { TextBalancer } from "@lib/balanceText";
import _debounce from "lodash/debounce";
import { MutableRefObject, useEffect, useMemo } from "react";

/* 
React Hook to balance text in a container.
*/
function useTextBalancer(
  ...refsOrSelectors: (string | MutableRefObject<HTMLElement | null>)[]
) {
  const textBalancer = useMemo(() => new TextBalancer(), []);

  const stringRefs = refsOrSelectors.filter(
    (ref) => typeof ref === "string"
  ) as string[];
  const elementRefs = refsOrSelectors.filter(
    (ref) => typeof ref !== "string" && ref.current
  ) as MutableRefObject<HTMLElement | null>[];

  useEffect(() => {
    if (TextBalancer.supportsNativeBalance()) {
      console.log("Supports native balance, skipping text balancer"); // eslint-disable-line no-console
      return;
    }

    stringRefs.forEach((ref) => {
      const elements = document.querySelectorAll(ref);
      elements.forEach((element) => {
        textBalancer.add(element as HTMLElement);
      });
    });

    elementRefs.forEach((ref) => {
      if (ref.current) {
        textBalancer.add(ref.current);
      }
    });

    return textBalancer.watch();
  });
}

export default useTextBalancer;
