"use client";

const COOKIE_NAME = "dd_colorScheme";

import {
  PropsWithChildren,
  createContext,
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

  console.log({ initialTheme, initialSystemTheme });

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

const SCRIPT = `
const COOKIE_NAME = "${COOKIE_NAME}";

const savedTheme = localStorage.getItem(COOKIE_NAME) || "system";

window.DD = window.DD || {
  setTheme: function(theme, persist = true) {
    this.theme = theme;

    if(theme === "system") {
      theme = window.DD.getComputedSystemTheme();
      if(persist) {
        this.userThemeSelection = "system";
        localStorage.removeItem(COOKIE_NAME);
      }
    } else if(persist) {
      this.userThemeSelection = theme;
      localStorage.setItem(COOKIE_NAME, theme);
    }

    document.documentElement.setAttribute("data-theme", theme);
  },
  getComputedSystemTheme: function() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark),(prefers-color-scheme: no-preference)').matches) {
      return "dark";
    } else {
      return "light";
    }
  },
  userThemeSelection: savedTheme,
  theme: "system",
  systemTheme: null,
};

window.DD.systemTheme = window.DD.getComputedSystemTheme();

window.DD.setTheme(savedTheme, false);

console.log(window.DD);
`;

export function ThemeScript() {
  return (
    <script
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: SCRIPT,
      }}
    />
  );
}
