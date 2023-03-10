import { library } from "@fortawesome/fontawesome-svg-core";

import {
  faUserNinja,
  faHomeHeart,
  faNewspaper,
} from "@fortawesome/pro-solid-svg-icons";
import {
  faTwitter,
  faGithub,
  faLinkedin,
  faMastodon,
} from "@fortawesome/free-brands-svg-icons";
// import { fass } from "@fortawesome/sharp-solid-svg-icons";

library.add(
  faTwitter,
  faGithub,
  faLinkedin,
  faMastodon,
  faUserNinja,
  faHomeHeart,
  faNewspaper
);

export default library;

export { faHomeHeart, faUserNinja };
