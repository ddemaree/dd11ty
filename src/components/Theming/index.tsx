import type { PropsWithChildren } from "react";
import { type ColorScheme, useSiteStore } from "@/lib/siteStore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faComputerClassic,
  faMoonStars,
  faSun,
} from "@fortawesome/sharp-solid-svg-icons";

import { RadioGroup, Popover, Transition } from "@headlessui/react";
import { usePopper } from "react-popper";

import clsx from "clsx";
import React from "react";

import themeMenuStyles from "./themeMenu.module.scss";
import useClientReady from "@/lib/hooks/useClientReady";

export const CheckIcon = () => (
  <FontAwesomeIcon icon={faCheck} fixedWidth className="justify-self-end" />
);

export const LightThemeIcon = () => (
  <FontAwesomeIcon icon={faSun} fixedWidth className="w-6" />
);
export const DarkThemeIcon = () => (
  <FontAwesomeIcon icon={faMoonStars} fixedWidth className="w-6" />
);

export function SystemThemeIcon() {
  const { systemTheme } = useSiteStore();

  return (
    <div className="fa-layers w-6">
      <FontAwesomeIcon icon={faComputerClassic} opacity={0.4} fixedWidth />
      <FontAwesomeIcon
        icon={systemTheme === "dark" ? faMoonStars : faSun}
        transform="shrink-4 right-5 down-5"
      />
    </div>
  );
}

export function CurrentThemeIcon() {
  const { theme } = useSiteStore();
  const clientReady = useClientReady();

  if (!clientReady) return null;

  switch (theme) {
    case "system":
      return <SystemThemeIcon />;
    case "light":
      return <LightThemeIcon />;
    case "dark":
      return <DarkThemeIcon />;
    case "arc":
      return null;
    default:
      return null;
  }
}

type ColorSchemeDefinition = {
  name: string;
  longLabel: string;
  icon?: () => JSX.Element;
  hidden?: boolean | (() => boolean);
};

const themeMap = new Map<ColorScheme, ColorSchemeDefinition>([
  [
    "system",
    { name: "System", longLabel: "Match system theme", icon: SystemThemeIcon },
  ],
  ["light", { name: "Light", longLabel: "Light theme", icon: LightThemeIcon }],
  ["dark", { name: "Dark", longLabel: "Dark theme", icon: DarkThemeIcon }],
  ["arc", { name: "Arc", longLabel: "Match Arc colors", hidden: true }],
]);

type ThemeOptionProps = PropsWithChildren<{
  value: ColorScheme;
  theme: ColorSchemeDefinition;
}>;

export const ThemeRadioOption = ({
  children,
  value,
  theme: { longLabel, icon: Icon },
}: ThemeOptionProps) => {
  return (
    <RadioGroup.Option
      value={value}
      className={clsx(
        "cursor-pointer select-none rounded-md p-2 hover:bg-[--dd-col-theme-hover-bg] gap-2 leading-none pr-[40px] relative w-full flex"
      )}
    >
      {({ checked }) => (
        <>
          {children}
          {Icon && <Icon />}
          <span>{longLabel}</span>
          {checked && (
            <span className="absolute right-2">
              <CheckIcon />
            </span>
          )}
        </>
      )}
    </RadioGroup.Option>
  );
};

export function ThemeSelector() {
  const { theme, setTheme } = useSiteStore();

  const handleChange = (value: ColorScheme) => {
    setTheme(value);
  };

  return (
    <RadioGroup value={theme} onChange={handleChange}>
      <RadioGroup.Label className="sr-only">Theme</RadioGroup.Label>
      {[...themeMap.entries()]
        .filter(([_, th]) => !th.hidden)
        .map(([key, theme]) => (
          <ThemeRadioOption
            key={key}
            value={key as ColorScheme}
            theme={theme}
          />
        ))}
    </RadioGroup>
  );
}

export function ThemeMenu() {
  const [referenceElement, setReferenceElement] =
    React.useState<HTMLButtonElement>();
  const [popperElement, setPopperElement] = React.useState<HTMLDivElement>();
  const [arrowElement, setArrowElement] = React.useState<HTMLDivElement>();

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom-start",
    modifiers: [
      { name: "offset", options: { offset: [0, 8] } },
      { name: "arrow", options: { element: arrowElement } },
    ],
  });

  return (
    <div className="relative z-40 h-10 w-10">
      <Popover>
        <Popover.Button
          suppressHydrationWarning
          className={({ open }) => {
            return clsx(
              "h-10 w-10 rounded-md outline-none active:outline-black/20",
              open && "outline-red-600/20"
            );
          }}
          ref={(e) => setReferenceElement(e as HTMLButtonElement)}
        >
          <CurrentThemeIcon />
          <span className="sr-only">Color scheme</span>
        </Popover.Button>
        <Transition
          enter="transition origin-top duration-100 ease-out"
          enterFrom="scale-y-0 opacity-0"
          enterTo="scale-y-100 opacity-1"
        >
          <Popover.Panel
            className="absolute flex w-max flex-col rounded-md p-2 bg-[--dd-col-theme-menu-bg] text-[--dd-col-theme-menu-text]"
            ref={(e) => setPopperElement(e as HTMLDivElement)}
            style={styles.popper}
            {...attributes.popper}
          >
            <div
              ref={(e) => setArrowElement(e as HTMLDivElement)}
              style={styles.arrow}
              className={themeMenuStyles.arrow}
            />
            <ThemeSelector />
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
}
