import dotenv from "dotenv";
dotenv.config();

import { Buffer } from "buffer";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import * as url from "url";
import TurndownService from "turndown";
import { parseISO } from "date-fns";

import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import * as domino from "domino";

async function processWPMarkup(src) {
  const processor = unified().use(rehypeParse).use(rehypeStringify);
  const out = await processor.process(src);
  return out.toString();
}

// const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const WP_AUTH_STRING = Buffer.from(
  `${process.env.WP_USER}:${process.env.WP_PASSWORD}`
).toString("base64");

const WP_API_URL = process.env.WP_URL || "https://wp2.demaree.me";

const WP_API_HEADERS = {
  "Content-Type": "application/json",
  Authorization: `Basic ${WP_AUTH_STRING}`,
};

const WP_API_POSTS = `${WP_API_URL}/wp-json/wp/v2/posts`;

// Client object for making requests to the WP API, taking an object as GET params

const fetchWP = async (url, params = {}) => {
  const defaultParams = {
    page: 1,
    per_page: 10,
  };

  const paramsObj = new URLSearchParams({
    ...defaultParams,
    ...params,
  });

  const response = await fetch(`${url}?${paramsObj.toString()}`, {
    method: "GET",
    headers: WP_API_HEADERS,
    params,
  });

  const posts = await response.json();
  const total = response.headers.get("X-WP-Total");
  const totalPages = response.headers.get("X-WP-TotalPages");

  return {
    posts,
    total,
    totalPages,
  };
};

// Get all posts from WP API

const getPosts = async (params = {}) => {
  const posts = await fetchWP(WP_API_POSTS, params);
  return posts;
};

// Convert a WP post to Markdown using the turndown module

const convertPostToMarkdown = (post) => {
  const turndownService = new TurndownService({
    headingStyle: "atx",
    hr: "--------",
    codeBlockStyle: "fenced",
    bulletListMarker: "-",
  });

  turndownService.keep(["figure", "div", "iframe", "video"]);

  turndownService.addRule("twitter-blockquotes", {
    filter(node, options) {
      return (
        node.nodeName === "BLOCKQUOTE" && node.className.includes("embed-tweet")
      );
    },
    replacement(content, node, options) {
      return content;
    },
  });

  const markdown = turndownService.turndown(post.content.rendered);
  return markdown;
};

const convertPostToFrontmatter = (post) => {
  const frontmatter = {
    title: post.title_raw || post.title?.rendered,
    date: parseISO(post.date),
  };

  if (post.custom_excerpt) {
    frontmatter.excerpt = post.custom_excerpt;
  }

  if (post.acf) {
    Object.assign(frontmatter, post.acf);
  }

  return frontmatter;
};

let currentPage = 1;
let totalPages = null;
const foundPosts = [];

do {
  const {
    posts,
    total,
    totalPages: _totalPages,
  } = await getPosts({ page: currentPage });

  if (!totalPages) totalPages = _totalPages;

  foundPosts.push(...posts);
  currentPage++;
} while (currentPage <= totalPages);

const POSTS_DIR = path.join(__dirname, "./posts");

await fs.mkdir(path.join(POSTS_DIR), { recursive: true });

const tagNamesAndClasses = [];

const jobs = foundPosts.map(async (post) => {
  const doc = domino.createDocument(post.content.rendered);
  const classes = doc.body.childNodes
    .filter(
      (n) =>
        n.nodeType === 1 &&
        !["P", "UL", "OL", "H1", "H2", "HR", "BLOCKQUOTE"].includes(
          n.tagName
        ) &&
        n.className !== ""
    )
    .map((n) => {
      const { tagName, className } = n;
      const classes = className.split(" ").map((c) => `${tagName}.${c}`);
      return [tagName, ...classes];
    })
    .reduce((acc, current) => {
      acc = [...acc, ...current];

      return acc;
    }, []);

  tagNamesAndClasses.push(classes);

  const urls = [...doc.body.querySelectorAll("a[href]").map((n) => n.href)];

  // const urlChecks = await Promise.all(
  //   urls.map(async (u) => {
  //     const urlObj = new URL(u);
  //     if (!urlObj.protocol.match(/^http/)) return;
  //     const linkRes = await fetch(u).catch((e) => {
  //       return { status: 567, error: e, statusText: e.toString() };
  //     });

  //     return [u, linkRes.status, linkRes.statusText];
  //   })
  // );

  const frontmatter = convertPostToFrontmatter(post);
  const markdown = convertPostToMarkdown(post);

  const content = matter.stringify(markdown, frontmatter);

  const filename = `${post.slug}.md`;
  const filepath = path.join(POSTS_DIR, filename);

  await fs.writeFile(filepath, content);
});

await Promise.all(jobs).then(() => {

  const selectorStats = tagNamesAndClasses.reduce((acc, current) => {
    current.forEach((v) => {
      acc[v] = acc[v] ?? 0;
      acc[v]++;
    });

    return acc;
  }, {});

  console.log(selectorStats);
});
