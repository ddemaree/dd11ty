import { Feed } from "feed";
import _ from "lodash";
import { DateTime } from "luxon";

export async function getFeed() {
  const docs = Object.values(import.meta.globEager("../pages/p/**/*.md"));

  // This is wrapped in Promise/async because content rendering is async
  // As it happens, doc content can't be rendered outside of Astro builds
  // (as of Jul '22) so this isn't necessary, but leaving it here just in
  // case Astro fixes this someday
  const items = await Promise.all(
    docs.map(async (doc) => {
      const url = `https://demaree.me${doc.url}`;
      // const content = await doc.compiledContent();
      const pubDate = doc.frontmatter.pubDate;

      return {
        title: doc.frontmatter.title,
        id: url,
        link: url,
        description: doc.frontmatter.description,
        // content,
        date: DateTime.fromISO(pubDate).toJSDate(),
      };
    })
  ).then((items) =>
    items.sort((a, b) => {
      return b.date.valueOf() - a.date.valueOf();
    })
  );

  const maxDate = _.max(items.map((i) => i.date));

  const feed = new Feed({
    title: "David Demaree's blog",
    description: "Notes on tech, business, and culture",
    id: "http://demaree.me/",
    link: "http://demaree.me/",
    language: "en", // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
    // image: "http://example.com/image.png",
    // favicon: "http://example.com/favicon.ico",
    // copyright: "All rig`hts reserved 2013, John Doe",
    updated: maxDate, // optional, default = today
    generator: "awesome", // optional, default = 'Feed for Node.js'
    feedLinks: {
      json: "https://example.com/json",
      atom: "https://example.com/atom",
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
