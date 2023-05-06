import { blogPostUrl } from "@/utils";
import { getCollection } from "astro:content";
import { js2xml } from "xml-js";
import { formatISO } from "date-fns";

/* 
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.example.com/foo.html</loc>
    <lastmod>2022-06-04</lastmod>
  </url>
</urlset>
*/
export const get = async () => {
  const data = {
    _declaration: {
      _attributes: {
        version: "1.0",
        encoding: "UTF-8",
      },
    },
    urlset: {
      _attributes: {
        xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
      },
      url: [{ loc: "https://demaree.me/", lastmod: "2023-05-01" }],
    },
  };

  const items = await getCollection("blog");
  items.forEach((item) => {
    const loc = blogPostUrl(item.slug, true);
    const lastmod = formatISO(item.data.date, {
      representation: "date",
    });

    data.urlset.url.push({ loc, lastmod });
  });

  const xmlString = js2xml(data, {
    compact: true,
    ignoreComment: true,
    spaces: 4,
  });

  return new Response(xmlString, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
