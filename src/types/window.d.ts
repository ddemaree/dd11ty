declare global {
  interface Window {
    DD: {
      setTheme: (theme: ColorScheme, persist?: boolean) => void;
      getComputedSystemTheme: () => "light" | "dark";
      getDarkModeQuery: () => MediaQueryList | null;
      userThemeSelection: string;
      theme: string;
      systemTheme: string;
      arcAvailable: boolean;
    };
  }
}

export {};