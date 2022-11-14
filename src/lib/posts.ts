import generateSlug from "./generateSlug";

export interface PostFrontMatter {
  title: string;
  date: string;
  description?: string;
  excerpt?: string;
  featuredImage?: string;
}

export interface Post {
  Content: Function;
  file: string;
  frontmatter: PostFrontMatter;
  uri: string;
  featuredImage?: any;
}

interface PostOptions {
  featured?: boolean;
  includeDrafts?: boolean;
}

/* Use instead of `Astro.glob` to fetch Markdown posts

Astro's glob function is just syntactic sugar around Vite's `import.meta.glob`, which in turn uses Vite's internal plumbing and Astro's bundler plugins to `import()` .md and .astro files as JS modules. Astro also uses this Vite magic to inject its global object into bundled files; the `Astro` global and related APIs aren't importable into functions like this one because Astro kinda only exists in the context of a Vite build. (Even if they also made this global available in lib functions, TypeScript would complain unless they also made types available. Which they could do, I guess?)

TODO: Filter out drafts
*/
export async function getAllPosts(
  opts: PostOptions = { featured: null, includeDrafts: false }
) {
  let _posts = Object.values(
    await import.meta.glob("../content/posts/*.{md,mdx}", { eager: true })
  ) as Post[];

  if (opts.featured) {
    // TODO: Show only featured posts
  }

  return sortPostsByDate(_posts);
}

/* Sorts an array of Post objects by date, parsing the string date into a JS object and getting its numeric value for sorting.

This function is called by `getAllPosts` so in practice I'll just use that. */
export function sortPostsByDate(allPosts: Post[]) {
  return allPosts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).valueOf() -
      new Date(a.frontmatter.date).valueOf()
  );
}

/* Filters a sorted array of Post objects to return the one matching a given string slug, as well as the previous and next posts in the list.

This is used in the post detail page (`[slug].astro`) to get the current post and to populate next/previous pagination. */
export function getSinglePost(allPosts: Post[], slug: string) {
  if (slug.match("/") || slug.match(/\.md$/)) slug = generateSlug(slug);

  const post = allPosts.find((p) => generateSlug(p.file) === slug);
  const slugIndex = allPosts.indexOf(post);
  const prevPost = slugIndex > 0 ? allPosts[slugIndex - 1] : null;
  const nextPost = slugIndex < allPosts.length ? allPosts[slugIndex + 1] : null;

  return { slug, post, prevPost, nextPost };
}
