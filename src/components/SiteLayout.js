import classNames from "classnames";
import Head from "next/head";
import SiteHeader from "./SiteHeader";

export default function SiteLayout({ children, fullBleed }) {
  const mainClasses = classNames([
    "space-y-4",
    !fullBleed && "px-[var(--inset-x)] py-8",
  ]);

  return (
    <>
      <Head>
        <body className="theme-light dark:theme-dark" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </Head>
      <div>
        <SiteHeader fullBleed={fullBleed} />
        <main className={mainClasses}>{children}</main>
      </div>
    </>
  );
}
