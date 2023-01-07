import { Cloudinary } from "@cloudinary/url-gen";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { JSDOM } from "jsdom";

const cld = new Cloudinary({
  cloud: {
    cloudName: "demaree",
  },
  url: {
    secure: true, // force https, set to false to force http
  },
});

function doDropCap(document) {
  // Make drop caps great again
  const firstNode = document.querySelector("p:first-of-type");
  if (firstNode && firstNode?.firstChild?.nodeName === "#text") {
    const textNode = firstNode.firstChild as Text;

    const initialText = firstNode.firstChild.textContent;
    const words = initialText?.split(" ");
    const firstWord = words?.slice(0, 1)[0] as string;
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
}

export default function sanitizeHtml(htmlInput: string): string {
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

  output = document.body.innerHTML.replace(/\n{2,}/g, "\n\n");

  return output;
}
