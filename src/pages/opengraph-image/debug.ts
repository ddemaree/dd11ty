import type { APIRoute } from "astro";
import fs from "fs/promises";

export const get: APIRoute = async ({ request }) => {
  const entries = await fs.readdir("../");
  return new Response(JSON.stringify(entries, null, 2), {
    headers: {
      "content-type": "application/json",
    },
  });
};
