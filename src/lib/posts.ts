import { AstroGlobal, MarkdownInstance } from "astro";

export async function getAllPosts() {
  let _posts = Object.values(await import.meta.glob("../posts/*.md"));
  _posts = await Promise.all(_posts.map((p) => p()));
  return _posts;
}

export interface PostGetter {
  Astro: AstroGlobal;
  allPosts: MarkdownInstance<Record<string, any>>[];
}

export class PostGetter {
  constructor(Astro: AstroGlobal) {
    this.Astro = Astro;
    this.allPosts = [];
  }

  async getAllPosts() {
    let _allPosts = await this.Astro.glob("../posts/*.md");
    _allPosts = _allPosts.sort(
      (a, b) =>
        new Date(b.frontmatter.date).valueOf() -
        new Date(a.frontmatter.date).valueOf()
    );
    this.allPosts = _allPosts;
    return this.allPosts;
  }
}
