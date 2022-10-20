---
title: Google Photos’ unguessable URLs
slug: google-photos-and-the-unguessable-url
date: '2015-06-23T19:34:47'
tags:
  - From Tumblr
  - Google
linkUrl: 'http://www.theverge.com/2015/6/23/8830977/google-photos-security-public-url-privacy-protected'
postFormat: Link
---
_The Verge_’s Russell Brandom on what, at first blush, looked like a security hole in Google Photos: [when you right-click an image, you get URLs that appear to be fully public](http://www.theverge.com/2015/6/23/8830977/google-photos-security-public-url-privacy-protected) and accessible by anyone. It's not as big a deal as it seems:

> The short answer is that the URL is working as a password. Photos URLs are typically around 40 characters long, so if you wanted to scan all the possible combinations, you'd be have to work through 10^70 different combinations to get the right one, a problem on an astronomical scale. "There are enough combinations that it's considered unguessable," says Aravind Krishnaswamy, an engineering lead on Google Photos. "It's much harder to guess than your password." Because web traffic for Photos is encrypted with SSL, it's also kept secret from anyone on the network who might be listening in. More importantly, the photo isn't placed at that URL until you ask for it. Google Photos normally pulls its images through a more complex back-end system, but when a user right-clicks on one of their own images, Photos generates a public URL and places the image there. Essentially, Google has reverse-engineered the right-click. By right-clicking, you’re summoning the image into existence at a public (though impossible to guess) URL, a rough equivalent of clicking a "Share" button.

But it's still problematic:

> For the most part, it's because there was no clear sign of permission from Photos. The web is littered with "Share This" buttons, so it's strange to find a way to pull down a photo without one. Those buttons usually also lock you in a particular network, whether it's Facebook, Flickr, or even an all-purpose site like Tumblr. Even if you share more than you meant to, it's still theoretically confined to other people using the same service, or more specific channels like an email address or local file. In that light, the Photos URL looks like a blank check. It can go anywhere, maybe even farther than you meant it to.

This doesn’t bother me so much, but I can afford to be flippant about privacy because I’m generally not under threat, whereas someone who _does_ need more control over who can see their digital materials has reason to be concerned. But it may be enough for Google to pop up a small, well-worded alert the first time someone right-clicks a photo, letting the user know that image URLs are public once shared. I do appreciate Google honoring the idea that publicly shared URLs should stay fresh. So long as public sharing truly is the user's intent and not a side effect, this is a good feature cleverly done.
