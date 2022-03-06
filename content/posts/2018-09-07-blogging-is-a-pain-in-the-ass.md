---
title: Blogging is a Pain in the Ass
description: 'Thoughts on blogging, or trying to blog, in 2018'
slug: blogging-is-a-pain-in-the-ass
modified: '2021-06-07T12:42:02.000Z'
date: '2018-09-08T00:00:00.000Z'
subtitle: There’s a reason we all moved to platforms like Twitter and Medium
---
<figure class="wp-block-image alignwide"><img src="https://res.cloudinary.com/demaree/images/v1615941114/bitsandletters-assets/cover-strangling-goose/cover-strangling-goose.jpg?_i=AA" alt="undefined" width="2000" height="1386"></figure>

<figure class="wp-block-image alignfull size-large"><img src="https://res.cloudinary.com/demaree/image/upload/v1615941114/bitsandletters-assets/cover-strangling-goose.jpg" alt="" class="wp-image-4104" data-original-src="https://demaree.blog/wp-content/uploads/2021/03/cover-strangling-goose-1024x710.jpg"><figcaption>From left: me, my blog (Photo:&nbsp;<a href="https://www.flickr.com/photos/fotoblitzcolor/5426388127">Eric Felton via Flickr</a>)</figcaption></figure>

A project of mine to start a “simple” WordPress blog is now on what feels like its ninth or tenth week of total [bikeshedding](https://en.wiktionary.org/wiki/bikeshedding).

I tweeted about this the other day:

<figure class="wp-block-embed is-type-rich is-provider-twitter wp-block-embed-twitter"><div class="wp-block-embed__wrapper">https://twitter.com/ddemaree/status/1037436562299121674</div></figure>

I mean, seriously, think about all that goes into making a personal blog on one’s own domain. You have to sort out hosting, you have to set up a domain and get everything wired up properly, you have to keep your blogging software up to date.

If you’re like me, and you want your site’s design and typography to be unique and perfect, you have to design a theme, and make some very low-stakes, distraction-prone decisions about the kind of blog you want and how that should be reflected in its design.

After all that, you can (and should) post things. But there’s a chicken-and-egg problem: to design a theme, you need content (sample or real), but maybe to be inspired to write good posts, you need your theme. I’d wager that one secret to Medium’s success is that every post is formatted in a near-perfect vanilla blog theme from the beginning, and you can even see this exquisite formatting being applied as you write.

* * *

For setting up my own self-hosted blog, I brought some extra toil on myself in that—having worked as what’s now called a Frontend Developer™—I’m used to developing web sites a certain way.

I have a local development setup for this blog; that’s Frontend Developer jargon meaning that, by convoluted means, I’m able to run my WordPress blog on my own computer, so I can make changes to it that won’t affect the live copy of the blog until I’m ready to push them there. Because it’s 2018, and [nothing is allowed to be easy anymore](https://frankchimero.com/writing/everything-easy-is-hard-again/), this local environment consists of a Git repo, three different Docker containers, a whole JavaScript build toolchain mostly for doing CSS, and some ridiculous bits of HTTP proxy plumbing so that changes to my CSS automatically refresh my blog design in the browser as I work.

90% of the free time I’ve put toward launching this blog has gone toward getting this Rube Goldberg-esque collection of containers, volume mounts, ports, compilers, whiz-bangs and geegaws to work consistently. It’s all really cool, especially if your aim is to produce a white paper on deploying enterprise-grade web applications and not a simple personal blog.

<figure class="wp-block-image alignwide size-large"><img src="https://res.cloudinary.com/demaree/image/upload/v1615941114/bitsandletters-assets/screenshot-cloud9-ide.png" alt="" class="wp-image-4106" data-original-src="https://demaree.blog/wp-content/uploads/2021/03/screenshot-cloud9-ide-1024x694.png"><figcaption>My Integrated Development Environment™ for working on a simple WordPress blog, in Amazon’s web-based IDE, Cloud9. I remember making web pages in Notepad — now I’m using a web page to code web pages</figcaption></figure>

The payoff for doing all this is that I can check out my WordPress code on any machine (including [a cloud machine at AWS](https://aws.amazon.com/cloud9/)), run one simple script, and be up and running in about 60 seconds, complete with that CSS hot reloading thing which is, no kidding, very cool.

But, at the same time, all of that is table stakes — it doesn’t get me a blog, it just gets me the ability to create and customize a blog. Which is fine if it all takes a couple days or weeks, but after a couple of months of tinkering it makes me long for the simplicity of Medium.

> I probably should just find or make a WordPress theme that looks like Medium TBH ¯\_(ツ)\_/¯
> 
> —Me, in [a tweet](https://twitter.com/ddemaree/status/1037436571400773633)

When in doubt, if you’d just as soon post to Medium but don’t trust Medium with long term stewardship of your words, you can’t go wrong making a personal blog that looks like Medium. That’s more or less what I am doing now, to get out of design decision paralysis.

But in the meantime, to get myself out of this endless cycle of tinkering with Frontend Development™ and DevOps™ Tooling® and bumbersnatch and fiddle-dee-dee—to get the posts I want to write out of my drafts folder and out into the world — I’m back here (sigh) on Medium.

(Fortunately I had the foresight to set up a custom domain name for myself before [Medium deprecated custom domains](https://help.medium.com/hc/en-us/articles/115003053487-Custom-Domains-service-deprecation) last November.)
