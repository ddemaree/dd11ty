"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import clsx from "clsx";
import { useTheme } from "./ThemeScript";
import { Stack } from "@components/Layout";
import { type ColorTheme } from ".";
import {
  CheckIcon,
  DarkThemeIcon,
  LightThemeIcon,
  SystemThemeIcon,
} from "./ThemeIcons";

export function ThemeOption({
  children,
  theme,
}: PropsWithChildren<{ theme: ColorTheme }>) {
  const { theme: currentTheme, setTheme } = useTheme();
  const classValue = clsx(
    "p-2 rounded text-left w-full",
    theme === currentTheme && "bg-gray-200 dark:bg-stone-950"
  );
  return (
    <li>
      <button
        onClick={(e) => {
          e.preventDefault();
          setTheme(theme);
        }}
        className={classValue}
      >
        <Stack className="w-full gap-4">
          <div className="flex flex-1 items-center justify-start gap-2">
            {children}
          </div>
          <div className="flex w-6 items-center justify-end">
            {theme === currentTheme && <CheckIcon />}
          </div>
        </Stack>
      </button>
    </li>
  );
}

type ThemeSelectorProps = {
  variant: "menu" | "row";
};

export function ThemeSelector({ variant = "menu" }: ThemeSelectorProps) {
  const [arcThemeAvailable, setArcAvailable] = useState(false);
  useEffect(() => {
    const compStyle = window.getComputedStyle(document.documentElement);
    const arcBackgroundVar = compStyle
      .getPropertyValue("--arc-palette-background")
      .trim();

    setArcAvailable(!!arcBackgroundVar);
  }, [setArcAvailable]);

  const { theme: currentTheme, setTheme } = useTheme();

  const showLabels = variant === "menu";

  const ThemeRadioOption = ({
    children,
    value,
  }: PropsWithChildren<{ value: ColorTheme }>) => {
    return (
      <RadioGroup.Option
        value={value}
        className={clsx(
          "cursor-pointer select-none rounded-md p-2 hover:bg-red-500/10 aria-checked:bg-red-500/50 gap-2 leading-none",
          variant === "row" &&
            "w-16 flex-1 grid grid-rows-[1.5rem_auto] items-center justify-items-center py-3",
          variant === "menu" &&
            "grid grid-cols-[1.5rem_1fr_2rem] items-center justify-items-start"
        )}
      >
        {({ checked }) => (
          <>
            {children}
            {checked && showLabels && <CheckIcon />}
          </>
        )}
      </RadioGroup.Option>
    );
  };

  return (
    <RadioGroup
      value={currentTheme}
      onChange={setTheme}
      className={clsx(`variant-${variant}`)}
    >
      <RadioGroup.Label className="block text-base font-medium mb-4 w-full text-center [.variant-menu_&]:sr-only">
        Select color theme
      </RadioGroup.Label>
      <div
        className={clsx(
          "flex gap-1",
          variant === "menu" && "flex-col",
          variant === "row" &&
            "justify-center border border-black/20 dark:border-white/20 rounded-md"
        )}
      >
        <ThemeRadioOption value="system">
          <SystemThemeIcon />
          <span className="[.variant-row_&]:text-[14px]">
            {showLabels ? "Match system theme" : "System"}
          </span>
        </ThemeRadioOption>
        <ThemeRadioOption value="light">
          <LightThemeIcon />
          <span className="[.variant-row_&]:text-[14px]">
            {showLabels ? "Light theme" : "Light"}
          </span>
        </ThemeRadioOption>
        <ThemeRadioOption value="dark">
          <DarkThemeIcon />
          <span className="[.variant-row_&]:text-[14px]">
            {showLabels ? "Dark theme" : "Dark"}
          </span>
        </ThemeRadioOption>
      </div>
    </RadioGroup>
  );
}
