import { Feed } from "feed";
import _ from "lodash";

import { getCollection } from "astro:content";
import { blogPostURL, renderMarkdown } from "./utils";

export async function getFeed() {
  const allPosts = await getCollection("blog");

  const items = await Promise.all(
    allPosts.map(async (post) => {
      const { title, date, excerpt } = post.data;

      const url = blogPostURL(post.slug);

      const content = await renderMarkdown(post.body);

      return {
        title,
        id: url,
        link: url,
        description: excerpt,
        date,
        content,
      };
    })
  );

  const maxDate = _.max(items.map((i) => i.date));

  const feed = new Feed({
    copyright: `©${new Date().getFullYear()} David Demaree, all rights reserved`,
    title: "David Demaree's blog",
    description: "Notes on tech, business, and culture",
    id: "http://demaree.me/",
    link: "http://demaree.me/",
    language: "en",
    // image: "http://example.com/image.png",
    // favicon: "http://example.com/favicon.ico",
    // copyright: "All rig`hts reserved 2013, John Doe",
    updated: maxDate,
    generator: "awesome",
    feedLinks: {
      json: "https://demaree.me/feeds/posts.json",
      rss: "https://demaree.me/feeds/posts.xml",
    },
    author: {
      name: "David Demaree",
      email: "david@demaree.me",
      link: "https://demaree.me/",
    },
  });

  items.forEach(feed.addItem);

  return feed;
}
