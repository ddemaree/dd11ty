import "../styles/main.css";
import SiteLayout from "../components/SiteLayout";
import { MDXProvider } from "@mdx-js/react";
import _ from "lodash";
import Image from "next/image";

const components = {
  Image,
};

function MyApp({ Component, pageProps }) {
  return (
    <MDXProvider components={components}>
      <SiteLayout>
        <Component {...pageProps} />
      </SiteLayout>
    </MDXProvider>
  );
}

export default MyApp;
