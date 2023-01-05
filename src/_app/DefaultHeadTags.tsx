export default function DefaultHeadTags() {
  return (
    <>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="icon" href="/dyn-icon.svg" />
      <link
        rel="alternate"
        type="application/rss+xml"
        title="RSS Feed for demaree.me"
        href="/feed/rss"
      />
      <link
        rel="alternate"
        type="application/json"
        title="JSON Feed for demaree.me"
        href="/feed/json"
      />

      <meta name="twitter:creator" content="@ddemaree" />
      <meta name="twitter:site" content="@ddemaree" />
      <meta property="og:type" content="website" />
    </>
  );
}
