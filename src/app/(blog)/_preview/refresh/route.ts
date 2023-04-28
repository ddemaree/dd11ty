import { getPreviewModifiedTime } from "@lib/wordpress/getPreviewPost";
import { NextRequest } from "next/server";

const previewKeys = ["parent", "id", "type", "status", "n", "h"] as const;
type PreviewKey = typeof previewKeys[number];
type PreviewSearchParams = { [K in PreviewKey]: string };

function getPreviewSearchParams(_url: string | URL) {
  const { searchParams } = new URL(_url);

  const _out = {} as PreviewSearchParams;
  previewKeys.forEach((key) => {
    _out[key] = searchParams.get(key) || "";
  });

  return _out;
}

export async function GET(request: NextRequest) {
  const previewParams = getPreviewSearchParams(request.url);

  const out = await getPreviewModifiedTime(previewParams.id, 0);

  return new Response(JSON.stringify({ lastModified: out.toMillis() }));
}
