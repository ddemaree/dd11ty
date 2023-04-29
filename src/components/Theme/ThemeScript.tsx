"use client";

const COOKIE_NAME = "dd_colorScheme";

const initializeTheme = function () {
  const savedTheme = localStorage.getItem(COOKIE_NAME) || "system";

  window.DD = window.DD || {
    setTheme: function (theme, persist = true) {
      this.theme = theme;

      if (theme === "system") {
        theme = window.DD.getComputedSystemTheme();
        if (persist) {
          this.userThemeSelection = "system";
          localStorage.removeItem(COOKIE_NAME);
        }
      } else if (persist) {
        this.userThemeSelection = theme;
        localStorage.setItem(COOKIE_NAME, theme);
      }

      document.documentElement.setAttribute("data-theme", theme);
    },
    getComputedSystemTheme: function () {
      if (
        window.matchMedia &&
        window.matchMedia(
          "(prefers-color-scheme: dark),(prefers-color-scheme: no-preference)"
        ).matches
      ) {
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
};

const SCRIPT = `const COOKIE_NAME = "${COOKIE_NAME}";
this._init=${initializeTheme.toString()};
this._init();`;

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
