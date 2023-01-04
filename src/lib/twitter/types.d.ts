interface TwitterUser {
  name: string;
  username: string;
  profile_image_url: string;
}

interface TwitterMedia {
  url: string;
  width: number;
  height: number;
  type: "photo";
}

interface TwitterWebsite {
  type: "website";
  images: TwitterMedia[];
  title: string;
  description: string;
  url: string;
  display_url?: string;
}

interface TwitterQuotedTweet {
  url: string;
}

type TwitterPart =
  | string
  | TwitterMedia
  | TwitterMention
  | TwitterWebsite
  | Tweet;

interface Tweet {
  author: TwitterUser;
  text: string;
  parts: TwitterPart[];
  created_at: string;
}
