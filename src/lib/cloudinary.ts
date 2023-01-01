import { Cloudinary } from "@cloudinary/url-gen";
import { Resize } from "@cloudinary/url-gen/actions";

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: "demaree",
  },
  url: {
    secure: true, // force https, set to false to force http
  },
});

export default cloudinary;
