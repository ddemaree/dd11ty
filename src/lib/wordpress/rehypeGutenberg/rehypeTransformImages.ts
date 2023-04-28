import { isDataUri, isWPProdURL } from "@lib/urls";
import type { Root, Element } from "hast";
import { select } from "hast-util-select";
import isUndefined from "lodash/isUndefined";
import objectHas from "lodash/has";
import { SKIP, visit } from "unist-util-visit";
import cloudinary from "@lib/cloudinary";
import { limitFill, scale } from "@cloudinary/url-gen/actions/resize";
import { format } from "@cloudinary/url-gen/actions/delivery";

const WP_PROD_DOMAINS = ["wp2.demaree.me", "wp.demaree.me", "demaree.me"];

/* 
Check whether a node has src = a data URI and the following properties:
- data-version
- data-public-id
*/
function isCloudinaryLazyLoadImg(imgElement: Element) {
  const { properties } = imgElement;

  if (isUndefined(properties) || !objectHas(properties, "src")) {
    return false;
  }

  return (
    isDataUri(properties.src as string) &&
    objectHas(properties, ["dataVersion", "dataPublicId"])
  );
}

async function cloudinaryGetInfo(
  publicId: string,
  deliveryType: "upload" | "fetch" = "upload"
) {
  const img = cloudinary.image(publicId);
  img.addFlag("getinfo");

  return fetch(img.toURL()).then(async (r) => {
    let json = await r.json();
    return json;
  });
}

export default function rehypeTransformImages() {
  return (tree: Root) => {
    visit(tree, "element", (node) => {
      const imgElement = select("img", node);
      if (node.tagName !== "figure" || !imgElement || !imgElement.properties)
        return SKIP;

      delete imgElement.properties.onLoad;
      delete imgElement.properties.dataCloudinary;
      delete imgElement.properties.dataResponsive;

      const origSrcURL = new URL(imgElement.properties.src as string);
      let newSrc: string = "";

      /* 
      For full content DIVs, we want:
      - src with max width like the wide setting of an image, rounded up (900),scaled for hiDPI (900 * 1.5 = 1350) and quality set to 60%
      - srcset with that URL as maximum, and breakpoints at 400 & 600px
      - format auto on all (for WebP where supported)

      imageURL(origSrcURL, {width: 1350, aspectRatio: 4/5, quality: 60})

      imageSrcset(origSrcURL, {maxWidth: 1350, aspectRatio: 4/5})
      */

      if (isWPProdURL(origSrcURL)) {
        let publicId = origSrcURL.pathname.slice(1);
        let img = cloudinary.image(publicId);

        img.resize(limitFill(1350)).addAction(format("auto"));

        newSrc = img.toURL();
      } else if (isCloudinaryLazyLoadImg(imgElement)) {
        newSrc = `https://img.demaree.me/upload/w_1200,f_auto,q_auto/v${imgElement.properties.dataVersion}/${imgElement.properties.dataPublicId}`;
      } else {
        // TODO: Get intrinsic size (which means this needs to be an async function)
        let img = cloudinary
          .image(origSrcURL.toString())
          .setDeliveryType("fetch");
        newSrc = img.resize(limitFill(1350)).addAction(format("auto")).toURL();
      }

      if (newSrc) imgElement.properties.src = newSrc;
      imgElement.properties.loading = "lazy";
    });
  };
}
