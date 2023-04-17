import { Feed } from "feed";
import _ from "lodash";
import { DateTime } from "luxon";
import { blogPostUrl, siteUrl } from "./urls";
import { getAllPosts } from "./wordpress";

const FeedFormats = ["rss", "json", "atom"] as const;
type FeedFormat = (typeof FeedFormats)[number];

type FeedFormatDefinition = {
  contentType: string;
  method: "rss2" | "json1" | "atom1";
};

const feedFormatDefinitions = new Map<FeedFormat, FeedFormatDefinition>([
  ["rss", { contentType: "application/rss+xml", method: "rss2" }],
  ["json", { contentType: "application/json", method: "json1" }],
  ["atom", { contentType: "application/atom+xml", method: "atom1" }],
]);

export function getFeedFormatDefinition(
  feedSlug: FeedFormat
): FeedFormatDefinition {
  return (
    feedFormatDefinitions.get(feedSlug) || feedFormatDefinitions.get("rss")!
  );
}

export function getFeedObj() {
  return new Feed({
    copyright: `©${new Date().getFullYear()} David Demaree, all rights reserved`,
    title: "David Demaree's blog",
    description: "Notes on tech, business, and culture",
    id: siteUrl("/", true),
    link: siteUrl("/", true),
    language: "en", // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
    // image: "http://example.com/image.png",
    // favicon: "http://example.com/favicon.ico",
    // generator: "awesome", // optional, default = 'Feed for Node.js'
    feedLinks: {
      // json: siteUrl("/feed.json", true),
      // atom: siteUrl("/feed.atom", true),
      rss: siteUrl("/feed", true),
    },
    author: {
      name: "David Demaree",
      email: "david@demaree.me",
      link: "https://demaree.me/",
    },
  });
}

export async function getFeed() {
  // TODO: Get content as well as metadata
  const allPosts = await getAllPosts();
  const _items = allPosts.posts;

  if (!_items) throw new Error("No posts in response");

  const rssItems = _items
    .map((post) => {
      const url = blogPostUrl(post.slug, true);
      const date = DateTime.fromISO(post.date).toJSDate();
      const { title, excerpt: description } = post;

      return {
        title,
        id: url,
        link: url,
        description,
        date,
      };
    })
    .sort((a, b) => {
      return b.date.valueOf() - a.date.valueOf();
    });

  const maxDate = _.max(rssItems.map((i) => i.date));

  const feed = getFeedObj();

  rssItems.forEach(feed.addItem);

  return feed;
}
