---
title: Blogging Is A Pain In The Ass
date: 2018-09-07
thumbnail: https://ddimg.imgix.net/wp/2021/03/cover-strangling-goose.jpg
tags:
- Blogging
- Writing
- Web Development
---

<figure class="wp-block-image alignfull size-large">
  <img src="https://ddimg.imgix.net/wp/2021/03/cover-strangling-goose-1024x710.jpg" width="1024" height="710" alt="" class="wp-image-4104 lazyload" />
  <figcaption>From left: me, my blog (Photo:&nbsp;<a href="https://www.flickr.com/photos/fotoblitzcolor/5426388127">Eric Felton via Flickr</a>)</figcaption>
</figure>

<p>A project of mine to start a “simple” WordPress blog is now on what feels like its ninth or tenth week of total&nbsp;<a href="https://en.wiktionary.org/wiki/bikeshedding">bikeshedding</a>.</p>

<p>I tweeted about this the other day:</p>

<!-- wp:embed {"url":"https://twitter.com/ddemaree/status/1037436562299121674","type":"rich","providerNameSlug":"twitter","responsive":true} -->
{% twitter "1037436562299121674" %}

<!-- wp:paragraph -->
<p>I mean, seriously, think about all that goes into making a personal blog on one’s own domain. You have to sort out hosting, you have to set up a domain and get everything wired up properly, you have to keep your blogging software up to date.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>If you’re like me, and you want your site’s design and typography to be unique and perfect, you have to design a theme, and make some very low-stakes, distraction-prone decisions about the kind of blog you want and how that should be reflected in its design.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>After all that, you can (and should) post things. But there’s a chicken-and-egg problem: to design a theme, you need content (sample or real), but maybe to be inspired to write good posts, you need your theme. I’d wager that one secret to Medium’s success is that every post is formatted in a near-perfect vanilla blog theme from the beginning, and you can even see this exquisite formatting being applied as you write.</p>
<!-- /wp:paragraph -->

<!-- wp:separator {"className":"is-style-dots"} -->
<hr class="wp-block-separator is-style-dots"/>
<!-- /wp:separator -->

<!-- wp:paragraph -->
<p>For setting up my own self-hosted blog, I brought some extra toil on myself in that—having worked as what’s now called a Frontend Developer™—I’m used to developing web sites a certain way.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>I have a local development setup for this blog; that’s Frontend Developer jargon meaning that, by convoluted means, I’m able to run my WordPress blog on my own computer, so I can make changes to it that won’t affect the live copy of the blog until I’m ready to push them there. Because it’s 2018, and&nbsp;<a href="https://frankchimero.com/writing/everything-easy-is-hard-again/">nothing is allowed to be easy anymore</a>, this local environment consists of a Git repo, three different Docker containers, a whole JavaScript build toolchain mostly for doing CSS, and some ridiculous bits of HTTP proxy plumbing so that changes to my CSS automatically refresh my blog design in the browser as I work.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>90% of the free time I’ve put toward launching this blog has gone toward getting this Rube Goldberg-esque collection of containers, volume mounts, ports, compilers, whiz-bangs and geegaws to work consistently. It’s all really cool, especially if your aim is to produce a white paper on deploying enterprise-grade web applications and not a simple personal blog.</p>
<!-- /wp:paragraph -->

<figure class="wp-block-image alignwide size-large">
  <img src="https://ddimg.imgix.net/wp/2021/03/screenshot-cloud9-ide.png" alt="" class="wp-image-4106 lazyload" />
  <figcaption>My Integrated Development Environment™ for working on a simple WordPress blog, in Amazon’s web-based IDE, Cloud9. I remember making web pages in Notepad — now I’m using a web page to code web pages</figcaption>
</figure>

<!-- wp:paragraph -->
<p>The payoff for doing all this is that I can check out my WordPress code on any machine (including&nbsp;<a href="https://aws.amazon.com/cloud9/">a cloud machine at AWS</a>), run one simple script, and be up and running in about 60 seconds, complete with that CSS hot reloading thing which is, no kidding, very cool.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>But, at the same time, all of that is table stakes — it doesn’t get me a blog, it just gets me the ability to create and customize a blog. Which is fine if it all takes a couple days or weeks, but after a couple of months of tinkering it makes me long for the simplicity of Medium.</p>
<!-- /wp:paragraph -->

<!-- wp:quote -->
<blockquote class="wp-block-quote"><p>I probably should just find or make a WordPress theme that looks like Medium TBH ¯_(ツ)_/¯</p><cite>—Me, in&nbsp;<a href="https://twitter.com/ddemaree/status/1037436571400773633">a tweet</a></cite></blockquote>
<!-- /wp:quote -->

<!-- wp:paragraph -->
<p>When in doubt, if you’d just as soon post to Medium but don’t trust Medium with long term stewardship of your words, you can’t go wrong making a personal blog that looks like Medium. That’s more or less what I am doing now, to get out of design decision paralysis.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>But in the meantime, to get myself out of this endless cycle of tinkering with Frontend Development™ and DevOps™ Tooling® and bumbersnatch and fiddle-dee-dee—to get the posts I want to write out of my drafts folder and out into the world — I’m back here (sigh) on Medium.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>(Fortunately I had the foresight to set up a custom domain name for myself before&nbsp;<a href="https://help.medium.com/hc/en-us/articles/115003053487-Custom-Domains-service-deprecation">Medium deprecated custom domains</a>&nbsp;last November.)</p>
<!-- /wp:paragraph -->