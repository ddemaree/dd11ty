import { Preset } from "unified";
import rehypeTransformImages from "./rehypeTransformImages";
import rehypeTransformTweetEmbeds from "./rehypeTransformTweetEmbeds";

const rehypeTransformGutenberg: Preset = {
  plugins: [rehypeTransformTweetEmbeds, rehypeTransformImages],
};

export default rehypeTransformGutenberg;
