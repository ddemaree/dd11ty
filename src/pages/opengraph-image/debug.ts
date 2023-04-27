import { getRootPath } from "@/utils";
import type { APIRoute } from "astro";
import { getEntryBySlug } from "astro:content";
import fs from "fs/promises";

export const get: APIRoute = async ({ request }) => {
  const rootPath = getRootPath();
  const sampleEntry = await getEntryBySlug("blog", "monkeys-typewriters");
  const sampleEntryImg = sampleEntry.data.cover;

  const entries = await fs.readdir("./dist/chunks");

  const out = {
    entries,
    sampleEntryImg,
    rootPath,
  };

  return new Response(JSON.stringify(out, null, 2), {
    headers: {
      "content-type": "application/json",
    },
  });
};
