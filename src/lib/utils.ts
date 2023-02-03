import { site, remarkPlugins } from "./sharedConfig";
import { renderMarkdown as astroRenderMarkdown } from "@astrojs/markdown-remark";

/* 
Returns the configured Astro site URL. This is the same behavior as the
`Astro.site` property, but externalized because the Astro global isn't
available outside of `.astro` pages.

@returns a URL object initialized with `astroConfig.site`, or `undefined` if the `site` property isn't set. */
export function astroSiteURL(): URL {
  return !site ? undefined : new URL(site);
}

/* 
Return a consistently formatted URL for blog posts

@param slug {string} - Unique URL slug for the post, passed to the /post/[slug] route and the Content API
@param baseURL {URL | string} - Base prefix (i.e. site URL) for absolute URLs, expected to be the output of `Astro.url` or `AstroConfig.url`

@returns String URL for the given post, either relative to site root (/post/elden-ring) or absolute (https://demaree.me/post/elden-ring) depending on whether a base URL was passed in
*/
export function blogPostURL(slug: string, baseURL: URL | string = "") {
  // TODO: Wire up absolute URLs
  return `/post/${slug}`;
}

/*
Uses Astro's Markdown rendering pipeline to render markup to a string,
because—bafflingly—there is no way to just get rendered markup from
the collections API.

N.B. - There is (still!) no way to render components in Markdown/MDX
to HTML natively in Astro, because the O.G. components feature was
removed in Astro 2 and the MDX integration returns an Astro component
which can (currently) only be rendered via an Astro page build. There's
an RFC to move this rendering into a module, but for now it's only possible
to render these pages if they _only_ include HTML/Markdown source

@param source {string} - Markdown source code to render

@returns Promise that resolves with the rendered HTML.
*/
export async function renderMarkdown(source: string): Promise<string> {
  /* TODO: Enable a way to change render contexts, e.g. between RSS & HTML.
  For instance, I'll probably add rehypePlugins that should be omitted for RSS */
  const markdownOptions = {
    remarkPlugins,
    contentDir: undefined, // this may break something eventually but seems fine so far
  };
  const output = await astroRenderMarkdown(source, markdownOptions);

  // RSS output seems to not always believe this is a string?
  return `${output.code}`;
}

/* 
Sorts an array of objects with a `date` property (such as blog posts) in descending order by date.

*/
export function sortByDate(entries: { date: Date }[]) {
  return [...entries].sort((a, b) => {
    return b.date.valueOf() - a.date.valueOf();
  });
}
