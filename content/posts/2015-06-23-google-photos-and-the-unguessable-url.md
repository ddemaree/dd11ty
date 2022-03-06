---
title: Google Photos and the unguessable URL
slug: google-photos-and-the-unguessable-url
modified: '2021-04-11T18:35:38.000Z'
date: '2015-06-23T15:34:47.000Z'
tumblr_url: >-
  https://ddemaree.tumblr.com/post/122257310299/google-photos-and-the-unguessable-url
link_url: >-
  http://www.theverge.com/2015/6/23/8830977/google-photos-security-public-url-privacy-protected
---
The Verge’s Russell Brandom on what, at first blush, looked like a security hole in Google Photos, wherein the URLs you get when you right-click an image appear to be fully public and accessible by anyone. Here’s why it’s not as big a deal as it seems:

> The short answer is that the URL is working as a password. Photos URLs are typically around 40 characters long, so if you wanted to scan all the possible combinations, you'd be have to work through 10^70 different combinations to get the right one, a problem on an astronomical scale. "There are enough combinations that it's considered unguessable," says Aravind Krishnaswamy, an engineering lead on Google Photos. "It's much harder to guess than your password." Because web traffic for Photos is encrypted with SSL, it's also kept secret from anyone on the network who might be listening in. More importantly, the photo isn't placed at that URL until you ask for it. Google Photos normally pulls its images through a more complex back-end system, but when a user right-clicks on one of their own images, Photos generates a public URL and places the image there. Essentially, Google has reverse-engineered the right-click. By right-clicking, you’re summoning the image into existence at a public (though impossible to guess) URL, a rough equivalent of clicking a "Share" button.

In other words, Google Photos _are_ secure and private… until you do something that Google is taking as a rough proxy for intent to share. Every photo is assigned an un-guessable URL, and when you right click, they place a copy of the photo at that URL. URLs are just names for resources, like photos. When you right-click the photo, Google assumes you’re going looking for that name, so they work behind the scenes to make the name—the URL—functional by the time you can do something with it, like paste it into Slack or open a new tab. Here’s why it’s still problematic:

> For the most part, it's because there was no clear sign of permission from Photos. The web is littered with "Share This" buttons, so it's strange to find a way to pull down a photo without one. Those buttons usually also lock you in a particular network, whether it's Facebook, Flickr, or even an all-purpose site like Tumblr. Even if you share more than you meant to, it's still theoretically confined to other people using the same service, or more specific channels like an email address or local file. In that light, the Photos URL looks like a blank check. It can go anywhere, maybe even farther than you meant it to.

This doesn’t bother me so much, but not only do I have a more nuanced understanding of internet privacy than a lot of people, I’m also a relatively affluent cisgender hetero white male with no enemies I’m aware of. I’m one of those assholes who can afford to be flippant about privacy because I’m not under threat. Having said that, it may be enough to address this concern for Google to simply pop up a small, well-worded alert the first time someone right-clicks a photo, letting the user know that image URLs are effectively public forever, maybe with the option of disabling that feature. I do appreciate them honoring the idea that publicly shared URLs should stay fresh. So long as public sharing is an intent and not a side effect, this is a good feature, cleverly done.
