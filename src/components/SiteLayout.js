import Head from "next/head";
import SiteHeader from "./SiteHeader";

export default function SiteLayout({ children }) {
  return <>
    <Head>
      <body className='theme-light dark:theme-dark' />
      <link rel="icon" href="/icon.svg" type="image/svg+xml" />
    </Head>
    <div>
      <SiteHeader />
      <main className='space-y-4 px-[var(--inset-x)] py-8'>
        {children}
      </main>
    </div>
  </>
}