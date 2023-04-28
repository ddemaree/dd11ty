import { Preset } from "unified";
import rehypeTransformImages from "./rehypeTransformImages";
import rehypeTransformTweetEmbeds from "./rehypeTransformTweetEmbeds";
import rehypeTransformCodeBlocks from "./rehypeTransformCodeBlocks";

const rehypeTransformGutenberg: Preset = {
  plugins: [
    rehypeTransformTweetEmbeds,
    rehypeTransformImages,
    rehypeTransformCodeBlocks,
  ],
};

export default rehypeTransformGutenberg;
