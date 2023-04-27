import { getRootPath } from "@/utils";
import type { APIRoute } from "astro";
import { getEntryBySlug } from "astro:content";
import fs from "fs/promises";
import { glob } from "glob";

export const get: APIRoute = async ({ request, params }) => {
  const rootPath = getRootPath();
  const sampleEntry = await getEntryBySlug("blog", "monkeys-typewriters");
  const sampleEntryImg = sampleEntry.data.cover;

  // const entries = await fs.readdir("./");
  const entries = await glob("/var/task/**/*.{jpg,png}");
  const currentFile = import.meta.url;

  const out = {
    entries,
    sampleEntryImg,
    rootPath,
    currentFile,
  };

  return new Response(JSON.stringify(out, null, 2), {
    headers: {
      "content-type": "application/json",
    },
  });
};
