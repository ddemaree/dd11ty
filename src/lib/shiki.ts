import type * as shiki from "shiki";
import { getHighlighter } from "shiki";

export interface ShikiConfig {
  langs?: shiki.ILanguageRegistration[];
  theme?: shiki.Theme | shiki.IThemeRegistration;
  wrap?: boolean | null;
}

import githubTheme from "shiki/themes/github-dark.json";
import draculaTheme from "shiki/themes/dracula.json";
import cssVarsTheme from "shiki/themes/css-variables.json";

const highlighterCacheAsync = new Map<string, Promise<shiki.Highlighter>>();

const getShiki = async (
  { langs = [], theme = "github-dark", wrap = false }: ShikiConfig,
  scopedClassName?: string | null
) => {
  const cacheID: string = typeof theme === "string" ? theme : theme.name;
  let highlighterAsync = highlighterCacheAsync.get(cacheID);

  if (!highlighterAsync) {
    highlighterAsync = getHighlighter({ theme }).then((hl) => {
      hl.setColorReplacements({
        "#000001": "var(--astro-code-color-text)",
        "#000002": "var(--astro-code-color-background)",
        "#000004": "var(--astro-code-token-constant)",
        "#000005": "var(--astro-code-token-string)",
        "#000006": "var(--astro-code-token-comment)",
        "#000007": "var(--astro-code-token-keyword)",
        "#000008": "var(--astro-code-token-parameter)",
        "#000009": "var(--astro-code-token-function)",
        "#000010": "var(--astro-code-token-string-expression)",
        "#000011": "var(--astro-code-token-punctuation)",
        "#000012": "var(--astro-code-token-link)",
      });
      return hl;
    });
    highlighterCacheAsync.set(cacheID, highlighterAsync);
  }

  const highlighter = await highlighterAsync;

  return highlighter;

  // NOTE: There may be a performance issue here for large sites that use `lang`.
  // Since this will be called on every page load. Unclear how to fix this.
  // for (const lang of langs) {
  //   await highlighter.loadLanguage(lang);
  // }
};

export default getShiki;
