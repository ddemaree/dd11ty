"use client";

import { Suspense, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ThemeSelector } from "./ThemeSelector";
import { CurrentThemeIcon } from "./ThemeIcons";
import { useClientReady } from "./ThemeScript";
import { usePopper } from "react-popper";

/* 
'system' just means delegate to what I get from the browser, be it a media query or a client hint.

themeSource = clientHint
themeSource = mediaQuery
themeSource = cookie && themeValue = 'system'

'light', 'dark', and 'arc' are explicit preferences
themeSource = cookie && themeValue

The 'arc' option is only valid if I detect Arc's CSS variables
*/
export default function ThemeMenu() {
  const clientReady = useClientReady();

  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement>();
  const [popperElement, setPopperElement] = useState<HTMLDivElement>();
  const [arrowElement, setArrowElement] = useState<HTMLDivElement>();
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom-start",
    modifiers: [
      { name: "offset", options: { offset: [0, 8] } },
      { name: "arrow", options: { element: arrowElement } },
    ],
  });

  return (
    <div className="relative z-40 h-10 w-10">
      {clientReady && (
        <Suspense fallback={<>loading</>}>
          <Popover>
            <Popover.Button
              suppressHydrationWarning
              className="h-10 w-10"
              ref={(e) => setReferenceElement(e as HTMLButtonElement)}
            >
              <CurrentThemeIcon />
              <span className="sr-only">Color theme</span>
            </Popover.Button>
            <Transition
              enter="transition origin-top duration-100 ease-out"
              enterFrom="scale-y-0 opacity-0"
              enterTo="scale-y-100 opacity-1"
            >
              <Popover.Panel
                className="absolute flex w-max flex-col rounded-md bg-stone-200 p-2 dark:bg-stone-800"
                ref={(e) => setPopperElement(e as HTMLDivElement)}
                style={styles.popper}
                {...attributes.popper}
              >
                <div
                  ref={(e) => setArrowElement(e as HTMLDivElement)}
                  style={styles.arrow}
                />
                <ThemeSelector variant={"menu"} />
              </Popover.Panel>
            </Transition>
          </Popover>
        </Suspense>
      )}
    </div>
  );
}
