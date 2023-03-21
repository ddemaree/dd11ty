"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { Popover } from "@headlessui/react";
import clsx from "clsx";

function ThemeOption({
  children,
  theme,
}: PropsWithChildren<{ theme: ColorTheme }>) {
  const classValue = clsx("p-2 rounded text-left");
  return (
    <li>
      <button
        onClick={(e) => {
          e.preventDefault();
        }}
        className={classValue}
      >
        {children}
      </button>
    </li>
  );
}

/* 

'system' just means delegate to what I get from the browser, be it a media query or a client hint.

themeSource = clientHint
themeSource = mediaQuery
themeSource = cookie && themeValue = 'system'

'light', 'dark', and 'arc' are explicit preferences
themeSource = cookie && themeValue

The 'arc' option is only valid if I detect Arc's CSS variables

*/
type ColorTheme = "system" | "light" | "dark" | "arc";

export default function ThemeMenu({
  currentTheme = "system",
}: {
  currentTheme?: ColorTheme;
}) {
  const [arcThemeAvailable, setArcAvailable] = useState(false);

  useEffect(() => {
    const compStyle = window.getComputedStyle(document.documentElement);
    const arcBackgroundVar = compStyle
      .getPropertyValue("--arc-palette-background")
      .trim();

    setArcAvailable(!!arcBackgroundVar);
  }, [setArcAvailable]);

  useEffect(() => {
    const win = window as any;

    console.log(win.themeInfo);
  }, [currentTheme]);

  return (
    <div className="relative z-40">
      <Popover>
        <Popover.Button>Current theme: TBD</Popover.Button>
        <Popover.Panel className="absolute p-3 bg-slate-500 w-[300px] flex flex-col gap-2">
          <ul>
            <ThemeOption theme="system">System theme</ThemeOption>
            <ThemeOption theme="light">Always light</ThemeOption>
            <ThemeOption theme="dark">Always dark</ThemeOption>
            {arcThemeAvailable && (
              <ThemeOption theme="arc">Arc theme colors</ThemeOption>
            )}
          </ul>
        </Popover.Panel>
      </Popover>
    </div>
  );
}
