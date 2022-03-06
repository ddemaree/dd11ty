---
title: Pow! Zero-Config Rack Serving for Mac OS X
slug: pow-zero-config-rack-serving-for-mac-os-x
modified: '2011-04-07T22:02:15.000Z'
date: '2011-04-07T22:02:15.000Z'
tumblr_url: >-
  https://ddemaree.tumblr.com/post/4424488150/pow-zero-config-rack-serving-for-mac-os-x
link_url: 'http://pow.cx/'
---
There is no non-nerdy way to talk about this, so non-developers feel free to sit this one out.

Pow is a Ruby/Rack application server written in Node.js, with CoffeeScript, by [Sam Stephenson](http://twitter.com/sstephenson). Through a series of small hacks, Pow lets you seamlessly run Ruby web applications on your own machine by creating a symlink to the app's directory at `~/.pow/yourappname`, then visiting `http://yourappname.dev` in your browser. There is no step 3, and you don't have to edit your hosts file or restart anything.

There are some trade-offs. Pow _completely_ takes over your Mac's port 80, which cuts off OS X's very convenient ability to serve up any HTML/PHP content saved to your `~/Sites` folder. But Pow can serve up static files pretty easily (save them to `~/.pow/yourappname/public`), and for PHP stuff Sam recommends the [rack-legacy](https://github.com/eric1234/rack-legacy) gem. Also, at the moment Pow lacks support for SSL serving, though [they're working on it](https://github.com/37signals/pow/issues/#issue/5).

Bottom line, this is an impressive technical feat and a new tool that a lot of people will find really, really helpful on a daily basis.
