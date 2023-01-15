import { Cloudinary } from "@cloudinary/url-gen";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { JSDOM } from "jsdom";
import shiki, { renderToHtml } from "shiki";

const cld = new Cloudinary({
  cloud: {
    cloudName: "demaree",
  },
  url: {
    secure: true, // force https, set to false to force http
  },
});

const highlighter = await shiki.getHighlighter({ theme: "dracula" });

export default async function sanitizeHtml(htmlInput: string): Promise<string> {
  let output = "";

  const dom = new JSDOM(`<!DOCTYPE html>${htmlInput}`);
  const document = dom.window.document;

  // Remove all script tags
  const scriptTags = document.querySelectorAll("script");
  scriptTags.forEach((tag) => tag.parentNode?.removeChild(tag));

  // Replace WordPress lazy-load images with simpler markup
  const imageNodes = Array.from(
    document.querySelectorAll("img[src^=data]") as NodeListOf<HTMLImageElement>
  ) as HTMLImageElement[];

  for (let x = 0; x < imageNodes.length; x++) {
    var thisNode = imageNodes[x];

    const originalWidth = thisNode.width;
    const originalHeight = thisNode.height;
    const aspectRatio = originalWidth / originalHeight;

    const newWidth = 960;
    const newHeight = newWidth / aspectRatio;

    thisNode.width = newWidth;
    thisNode.height = newHeight;

    const cldPublicId = thisNode.getAttribute("data-public-id") + "";
    const cldImage = cld.image(cldPublicId);

    const sizes = [1440, 960, 480];
    const srcSet = sizes
      .map((size) =>
        [cldImage.resize(scale(size)).toURL(), `${size}w`].join(" ")
      )
      .join(", ");

    cldImage.resize(scale(1350));
    thisNode.src = cldImage.toURL();
    thisNode.srcset = srcSet;
    thisNode.sizes = "(max-width: 1440px) 100vw, 1440px";

    thisNode.removeAttribute("data-srcset");
    thisNode.removeAttribute("data-sizes");
    thisNode.removeAttribute("data-transformations");
    thisNode.removeAttribute("onload");
  }

  const codeBlocks = document.querySelectorAll(
    'pre[class*="language-"] > code'
  );
  if (codeBlocks.length > 0) {
    for (
      let codeBlockIdx = 0;
      codeBlockIdx < codeBlocks.length;
      codeBlockIdx++
    ) {
      var thisCodeBlock = codeBlocks[codeBlockIdx];
      var thisPreBlock = thisCodeBlock.parentElement as HTMLPreElement;
      var codeSrc = thisCodeBlock.textContent as string;

      var languageClass = Array.from(thisPreBlock.classList).find((c) =>
        c.match(/^language-/)
      );

      if (languageClass) {
        var languageName = languageClass.replace("language-", "");
        var highlightedCode = highlighter.codeToHtml(codeSrc, {
          lang: languageName,
        });

        // var tokens = highlighter.codeToThemedTokens(codeSrc, languageName);
        // var highlightedCode = renderToHtml(tokens, {
        //   elements: {
        //     token({ style, children, token }) {
        //       console.log(
        //         style,
        //         token.explanation?.map((t) => t.scopes)
        //       );
        //       return `<span style="${style}">${children}</span>`;
        //     },
        //   },
        // });

        // console.log(highlighter.getTheme("dracula"));

        // console.log(highlightedCode);
        thisCodeBlock.innerHTML = highlightedCode;
      }

      console.log();
    }
  }

  output = document.body.innerHTML.replace(/\n{2,}/g, "\n\n");

  return output;
}
