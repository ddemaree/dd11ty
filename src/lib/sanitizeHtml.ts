import { cloudinaryResizeImage } from "./cloudinary";
import { JSDOM } from "jsdom";

import Tweet from "@lib/twitter/Tweet.tsx";

import { renderToStaticMarkup } from "react-dom/server";
import fetchTweets from "./twitter/fetchTweets";
import * as React from "react";

function createDocument(htmlInput: string) {
  const dom = new JSDOM(`<!DOCTYPE html><div id="root">${htmlInput}</div>`);
  return dom.window.document;
}

function addDropCap(document: Document) {
  // Make drop caps great again
  const firstNode = document.querySelector("p:first-of-type");
  if (firstNode && firstNode?.firstChild?.nodeName === "#text") {
    const textNode = firstNode.firstChild as Text;

    const initialText = firstNode.firstChild.textContent;
    const words = initialText?.split(" ");
    const firstWord = words?.slice(0, 1)[0];
    const remainder = words?.slice(1).join(" ") as string;

    const letters = firstWord?.split("") as string[];
    const firstLetter = letters?.slice(0, 1)[0];
    const restOfFirstWord = letters?.slice(1).join("");

    const wrapper = document.createElement("span");
    wrapper.classList.add("drop-cap");
    wrapper.role = "text";

    const inner = document.createElement("span");
    inner.setAttribute("aria-hidden", "true");

    const capElement = document.createElement("span");
    capElement.classList.add("initial");
    capElement.appendChild(document.createTextNode(firstLetter));

    inner.appendChild(capElement);
    inner.appendChild(document.createTextNode(restOfFirstWord));

    wrapper.appendChild(inner);

    const accessibleText = document.createElement("span");
    accessibleText.classList.add("sr-only");
    accessibleText.appendChild(document.createTextNode(firstWord));
    wrapper.appendChild(accessibleText);

    textNode.replaceWith(wrapper, " ", remainder);
  }

  return document;
}

function fixImageNodes(document) {
  // Replace WordPress lazy-load images with simpler markup
  const imageNodes = document.querySelectorAll(
    "img[src^='data:']"
  ) as NodeListOf<HTMLImageElement>;
  for (let x = 0, thisNode = imageNodes[x]; x < imageNodes.length; x++) {
    const originalWidth = thisNode.width;
    const originalHeight = thisNode.height;
    const aspectRatio = originalWidth / originalHeight;

    const newWidth = 960;
    const newHeight = newWidth / aspectRatio;

    thisNode.width = newWidth;
    thisNode.height = newHeight;

    const cldPublicId = thisNode.getAttribute("data-public-id") + "";

    cloudinaryResizeImage(cldPublicId, 1350);

    const sizes = [1440, 960, 480];
    const srcSet = sizes
      .map((size) =>
        [cloudinaryResizeImage(cldPublicId, size), `${size}w`].join(" ")
      )
      .join(", ");

    thisNode.src = cloudinaryResizeImage(cldPublicId, 1350);
    thisNode.srcset = srcSet;
    thisNode.sizes = "(max-width: 1440px) 100vw, 1440px";

    thisNode.removeAttribute("data-srcset");
    thisNode.removeAttribute("data-sizes");
    thisNode.removeAttribute("data-transformations");
    thisNode.removeAttribute("onload");
  }
}

export default async function sanitizeHtml(htmlInput: string): Promise<string> {
  let output = "";
  const document = createDocument(htmlInput);

  // Remove all script tags
  const scriptTags = document.querySelectorAll("script");
  scriptTags.forEach((tag) => tag.parentNode?.removeChild(tag));

  addDropCap(document);
  fixImageNodes(document);

  const embedIframes = document.querySelectorAll("#root > figure iframe");
  for (let iframeIndex = 0; iframeIndex < embedIframes.length; iframeIndex++) {
    const currentIframe = embedIframes[iframeIndex] as HTMLIFrameElement;
    const ifWidth = parseInt(currentIframe.width);
    const ifHeight = parseInt(currentIframe.height);

    if (ifWidth) {
      const ifAspect = ifHeight / ifWidth;
      currentIframe.dataset.aspectRatio = `${ifAspect}`;

      // If the width is between 400-720px, set the max width to its
      // native width. But if it's larger or smaller, set to 100% so
      // it fills the container
      currentIframe.style.maxWidth =
        ifWidth > 400 && ifWidth < 720 ? `${ifWidth}px` : `100%`;

      // If the aspect ratio is around 16:9, let's just assume it's 16:9
      // For math reasons the computed ratio may be a long fraction-y
      // number but usually around 0.56
      if (ifAspect > 0.56 && ifAspect < 0.57) {
        currentIframe.classList.add("modified-hello-david", "aspect-video");
      }
    }
  }

  const tweetElems = document.querySelectorAll("#root > *[class*=twitter]");
  for (let index = 0; index < tweetElems.length; index++) {
    const element = tweetElems[index];

    const tweetLink = element.querySelector(
      "a[href*='twitter.com']"
    ) as HTMLAnchorElement;
    const tweetUrl = new URL(tweetLink.href);
    const tweetId = tweetUrl.pathname.split("/").at(-1);

    const tweets = await fetchTweets([tweetId]);

    const tweetComponent = React.createElement(Tweet, {
      tweet: tweets[0],
    });
    const tweetMarkup = renderToStaticMarkup(tweetComponent);

    element.innerHTML = tweetMarkup;
  }

  // Remove excess whitespace
  output = document.body.innerHTML.replace(/\n{2,}/g, "\n\n");

  return output;
}
