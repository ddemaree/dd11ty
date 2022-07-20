import "../styles/main.css";
import SiteLayout from "../components/SiteLayout";
import { MDXProvider } from "@mdx-js/react";
import _ from "lodash";
import Image from "next/image";

const components = {
  Image,
};

function MyApp({
  Component,
  pageProps: { layout: layoutProps, ...pageProps },
}) {
  return (
    <MDXProvider components={components}>
      <SiteLayout {...layoutProps}>
        <Component {...pageProps} />
      </SiteLayout>
    </MDXProvider>
  );
}

export default MyApp;
