import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/* Many request parameters are weirdly not available from server components; this middleware saves the incoming URL as a header so it can be read by e.g. the nav bar. */
export function middleware(req: NextRequest) {
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-request-url", req.url);

  return NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    },
  });
}
