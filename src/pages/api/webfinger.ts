function webfingerOutput(email: string): any {
  const subject = `acct:${email}`;
  const aliases = [
    "https://mastodon.social/@demaree",
    "https://mastodon.social/users/demaree",
  ];
  const links = [
    {
      rel: "http://webfinger.net/rel/profile-page",
      type: "text/html",
      href: "https://mastodon.social/@demaree",
    },
    {
      rel: "self",
      type: "application/activity+json",
      href: "https://mastodon.social/users/demaree",
    },
    {
      rel: "http://ostatus.org/schema/1.0/subscribe",
      template: "https://mastodon.social/authorize_interaction?uri={uri}",
    },
  ];

  return { subject, aliases, links };
}

import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(webfingerOutput("david@demaree.me"));
}
