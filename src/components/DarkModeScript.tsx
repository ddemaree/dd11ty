"use client";

const COOKIE_NAME = "dd_colorScheme";

const SCRIPT = `
const COOKIE_NAME = "${COOKIE_NAME}";

window.DD = window.DD || {};

window.DD.setTheme = function(theme, setCookie = true) {
  document.documentElement.setAttribute("data-theme", theme);
  if(setCookie)
    document.cookie = COOKIE_NAME + "=" + theme + "; path=/; max-age=31536000";
};

if(document.cookie.includes(COOKIE_NAME)) {
  // cookie already set
  const cookieTheme = document.cookie.split("; ").find(row => row.startsWith(COOKIE_NAME)).split("=")[1];
  document.documentElement.setAttribute("data-theme", cookieTheme);

} else {
  if (window.matchMedia && (window.matchMedia('(prefers-color-scheme: dark)').matches || window.matchMedia('(prefers-color-scheme: no-preference)').matches)) {
    // dark mode
    window.DD.setTheme("dark", false);
  } else {
    // light mode
    window.DD.setTheme("light", false);
  }  
}

`;

export default function DarkModeScript() {
  return (
    <script
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: SCRIPT,
      }}
    />
  );
}
