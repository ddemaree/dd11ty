import { visit } from "unist-util-visit";

function isTweet(url) {
  return url.hostname === "twitter.com" && url.pathname.match(/\/status\/\d+/);
}

export function remarkEmbeds(options) {
  const transform = async (tree) => {
    const promises: Promise<any>[] = [];

    const transformTweet = (node, index, parent) => {
      let oEmbedUrl: string = "";
      let promise: Promise<any> | undefined;
      let url: URL;

      if (
        node.type === "paragraph" &&
        node.children &&
        node.children[0]?.type === "link"
      ) {
        const firstLink = node.children[0];
        url = new URL(firstLink.url);

        if (isTweet(url)) {
          oEmbedUrl = `https://publish.twitter.com/oembed?dnt=true&url=${url.toString()}`;
        }

        if (oEmbedUrl) {
          promise = fetch(oEmbedUrl)
            .then((res) => res.json())
            .then((json) => {
              if (json.html) {
                node.type = "html";
                node.value = `<figure class="dd-embed dd-embed-twitter">${json.html}</figure>`;
                node.children = [];
              }
            })
            .catch((err) => console.log(err));
        }

        if (promise) promises.push(promise);
      }
    };

    // Find paragraphs that contain only a link
    visit(tree, "paragraph", transformTweet);
    visit(tree, "text", transformTweet);

    await Promise.all(promises);
  };

  return transform;
}
