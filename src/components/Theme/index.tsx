export type ColorTheme = "system" | "light" | "dark" | "arc";

import { ThemeProvider, useTheme } from "./ThemeContext";
import ThemeMenu from "./ThemeMenu";
import { ThemeScript } from "./ThemeScript";
import { ThemeSelector } from "./ThemeSelector";

export { ThemeProvider, ThemeScript, useTheme, ThemeMenu, ThemeSelector };
