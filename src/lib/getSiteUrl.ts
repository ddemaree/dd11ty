import { isProduction } from "./siteUtils";

export default function getSiteUrl() {
  if (isProduction()) {
    // Seems like Vercel's environment ought to be able to provide this but whatever
    return "demaree.me";
  }

  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_VERCEL_URL ??
    "localhost:3000"
  );
}
