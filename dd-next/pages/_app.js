import Head from 'next/head'

import '@fortawesome/fontawesome-svg-core/styles.css';
import '../css/index.css'

function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <link rel='dns-prefetch' href='https://c0.wp.com' />
      <link href="https://c0.wp.com/c/5.7.2/wp-includes/css/dist/block-library/theme.min.css" rel="stylesheet" type="text/css" />

      <link rel='preconnect' href='https://cdn.demaree.net' />
      <link href="https://cdn.demaree.net/fonts/soehne/index.css" rel="stylesheet" type="text/css" />
    </Head>
    <Component {...pageProps} />
  </>
}

export default MyApp