import { Cloudinary } from "@cloudinary/url-gen";

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: "demaree",
  },
  url: {
    secure: true, // force https, set to false to force http
    analytics: false,
  },
});

export default cloudinary;
