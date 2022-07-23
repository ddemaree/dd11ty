import generateSlug from "./generateSlug";

export interface PostFrontMatter {
  title: string;
  date: string;
}

export interface Post {
  Content: Function;
  file: string;
  frontmatter: PostFrontMatter;
  uri: string;
}

export function sortPostsByDate(allPosts: Post[]) {
  return allPosts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).valueOf() -
      new Date(a.frontmatter.date).valueOf()
  );
}

export function getSinglePost(allPosts: Post[], slug: string) {
  if (slug.match("/") || slug.match(/\.md$/)) slug = generateSlug(slug);

  const post = allPosts.find((p) => generateSlug(p.file) === slug);
  const slugIndex = allPosts.indexOf(post);
  const prevPost = slugIndex > 0 ? allPosts[slugIndex - 1] : null;
  const nextPost = slugIndex < allPosts.length ? allPosts[slugIndex + 1] : null;

  return { slug, post, prevPost, nextPost };
}
