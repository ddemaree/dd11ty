// app/head.js
import { DEFAULT_META } from "@lib/meta";
import { NextSeo } from "next-seo";

export default async function Head() {
  return <NextSeo {...DEFAULT_META} useAppDir={true} />;
}
