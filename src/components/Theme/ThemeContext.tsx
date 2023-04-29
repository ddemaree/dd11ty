"use client";

import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type ThemeContextType = {
  clientReady: boolean;
  theme: string;
  systemTheme: string;
  setTheme: (theme: string) => void;
};

export const themeContext = createContext<ThemeContextType>({
  clientReady: false,
  theme: "light",
  systemTheme: "light",
  setTheme: () => {},
});

export const useTheme = () => {
  return useContext<ThemeContextType>(themeContext);
};

export const useClientReady = () => {
  const { clientReady } = useTheme();
  return clientReady;
};

export function ThemeProvider({ children }: PropsWithChildren<{}>) {
  let initialTheme: string = "light";
  let initialSystemTheme: string = "light";
  let themeObject: any = { setTheme: () => {} };

  // If our head script ran — which it probably did — we can use the theme
  // from the window object. Otherwise, we'll default to light.
  if (typeof window !== "undefined") {
    const win = window as any;
    if (win.DD) {
      initialTheme = win.DD.theme;
      initialSystemTheme = win.DD.systemTheme;
      themeObject = win.DD;
    }
  }

  const [clientReady, setClientReady] = useState(false);
  const [theme, _setTheme] = useState(initialTheme);
  const [systemTheme, setSystemTheme] = useState(initialSystemTheme);

  useEffect(() => {
    setClientReady(true);
  }, []);

  const mq = useMemo(() => {
    if (typeof window === "undefined") {
      return null;
    }

    return window.matchMedia(
      "(prefers-color-scheme: dark), (prefers-color-scheme: no-preference)"
    );
  }, []);

  const setTheme = useCallback((theme: string) => {
    themeObject.setTheme(theme, true);
    _setTheme(theme);
  }, []);

  const handleSystemThemeChange = useCallback(
    (e: MediaQueryListEvent) => {
      if (theme === "system") {
        setTheme("system");
      }

      if (e.matches) {
        setSystemTheme("dark");
      } else {
        setSystemTheme("light");
      }
    },
    [theme, systemTheme]
  );

  const contextValue = useMemo(() => {
    return {
      clientReady,
      theme,
      systemTheme,
      setTheme,
    };
  }, [theme, systemTheme, clientReady, setTheme]);

  useEffect(() => {
    if (!mq) {
      return;
    }

    mq.addEventListener("change", handleSystemThemeChange);
    return () => {
      mq.removeEventListener("change", handleSystemThemeChange);
    };
  }, [theme, systemTheme]);

  return (
    <themeContext.Provider value={contextValue}>
      {children}
    </themeContext.Provider>
  );
}
