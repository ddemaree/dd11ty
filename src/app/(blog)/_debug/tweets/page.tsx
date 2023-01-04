import parse from "html-react-parser";
import htmlToReact from "@lib/text/htmlToReact";
import extractTweetIds from "@lib/twitter/extractTweetIds";
import fetchTweets from "@lib/twitter/fetchTweets";

const htmlContent = `

<h2>Code Blocks</h2>

<pre class=\"wp-block-code\"><code>&lt;!-- index.html -->\n&lt;html>\n  &lt;head>\n    &lt;title>A throwaway web page experiment&lt;\/title>\n    &lt;link href=\".\/styles.css\" rel=\"stylesheet\" \/>\n  &lt;\/head>\n  &lt;body>\n    &lt;h1>Time to code!&lt;\/h1>\n    &lt;div id=\"vue-app\">&lt;\/div>\n    &lt;script src=\".\/app.js\">&lt;\/script>\n  &lt;\/body>\n&lt;\/html><\/code><\/pre>

<h2>Tweets</h2>

<p>Here are some tweets:</p>

<figure class="twitter-tweet"><blockquote>
  <a href="https://twitter.com/bfcarlson/status/1609988081825751041?s=20&t=LdkT_MVPutbQtZ3jiZ-MaA">Tweet</a>
</blockquote></figure>

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
  const reactContent = await htmlToReact(htmlContent.trim(), tweets);

  return (
    <div className=" mx-auto max-w-xl w-inset [&_h2]:font-bold [&_h2]:text-3xl [&_h2]:mt-12">
      <h1 className="font-semibold text-5xl leading-tight">Blocks</h1>

      <div className="space-y-6">{reactContent}</div>
    </div>
  );
}
