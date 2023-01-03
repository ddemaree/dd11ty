import parse from "html-react-parser";
import htmlToReact from "@lib/text/htmlToReact";
import extractTweetIds from "@lib/twitter/extractTweetIds";
import fetchTweets from "@lib/twitter/fetchTweets";

const htmlContent = `
<p>Here are some tweets:</p>

<figure class="twitter-tweet"><blockquote>
  <a href="https://twitter.com/davidhoang/status/1610061657388257281?s=20&t=n152ZgLW6quQOL5DY63xFg">Tweet</a>
</blockquote></figure>

<figure class="twitter-tweet"><blockquote>
  <a href="https://twitter.com/erikvorhes/status/1610042653068128256?s=20&t=n152ZgLW6quQOL5DY63xFg">Tweet</a>
</blockquote></figure>

<figure class="twitter-tweet"><blockquote>
  <a href="https://twitter.com/tfeener/status/1610277626161102849?s=20&t=n152ZgLW6quQOL5DY63xFg">Tweet</a>
</blockquote></figure>

<figure class="twitter-tweet"><blockquote>
  <a href="https://twitter.com/ultrasparky/status/1610101052354830337?s=20&t=LdkT_MVPutbQtZ3jiZ-MaA">Tweet</a>
</blockquote></figure>

`;

export default async function DebugTweetsPage() {
  const tweetIds = extractTweetIds(htmlContent);
  const tweets = await fetchTweets(tweetIds);
  const plainReactContent = parse(htmlContent);
  const reactContent = htmlToReact(htmlContent.trim(), tweets);

  return (
    <div className=" mx-auto max-w-md w-inset">
      <h1>Tweet previews</h1>
      <h2>Original</h2>
      {/* <div dangerouslySetInnerHTML={{ __html: htmlContent }} /> */}
      {plainReactContent}
      {reactContent}
    </div>
  );
}
