import { TextBalancer } from "@lib/balanceText";
import _debounce from "lodash/debounce";
import { MutableRefObject, useEffect, useMemo } from "react";
import FontFaceObserver from "fontfaceobserver";

type RefOrSelector = string | MutableRefObject<HTMLElement | null>;
type FontFamily = string;

/* 
React Hook to balance text in a container.
*/
function useTextBalancer(
  refsOrSelectors: RefOrSelector | RefOrSelector[] = [],
  fontDeps: FontFamily[] = []
) {
  const fontObservers: FontFaceObserver[] = useMemo(() => {
    return fontDeps.map((font) => new FontFaceObserver(font));
  }, [fontDeps]);

  const textBalancer = useMemo(() => new TextBalancer(), []);
  refsOrSelectors = Array.isArray(refsOrSelectors)
    ? refsOrSelectors
    : [refsOrSelectors];

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

    Promise.all(fontObservers.map((observer) => observer.load()))
      .then(() => {
        console.log("Fonts loaded, balancing text"); // eslint-disable-line no-console
        textBalancer.balance();
      })
      .then(() => {
        console.log("Text balanced"); // eslint-disable-line no-console
      });

    return textBalancer.watch(false);
  });
}

export default useTextBalancer;
