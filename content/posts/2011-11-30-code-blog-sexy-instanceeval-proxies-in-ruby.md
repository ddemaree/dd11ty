---
title: 'Code Blog: Sexy instance_eval proxies in Ruby'
slug: code-blog-sexy-instanceeval-proxies-in-ruby
modified: '2011-11-30T15:59:00.000Z'
date: '2011-11-30T15:59:00.000Z'
tumblr_url: >-
  https://ddemaree.tumblr.com/post/13548177478/code-blog-sexy-instanceeval-proxies-in-ruby
link_url: 'https://gist.github.com/1408149'
---
Some of the most mind-blowing language features in popular Ruby libraries/frameworks are made possible through the use of delegate proxies: objects that invisibly intercept method and variable calls in your code and forward them to one or more receiver objects.

For example this pattern is used in ActiveRecord to provide association methods that behave like Enumerables sometimes, like scopes at other times, while also providing some association-specific tasks like `build` or `clear`. One attribute can behave like three things at once — an Array, a scope, and an association — because when you send it messages, you're actually talking to _association proxy_, a fourth kind of thing that serves as a kind of message bus between you and your data.

What I'm interested in right now is a simple, petty question: why is it that the block syntax in [Sunspot](http://github.com/sunspot/sunspot) — Mat Brown's fantastic DSL for working with Apache Solr — lets me use variables or methods from outside its scope, like controller params or model attributes, but Karel Minarek's ElasticSearch library [Tire](http://github.com/karmi/tire) doesn't? Again, the answer is a proxy.

In this gist, I go through each part of the `ContextBoundDelegate` proxy from Sunspot, explain how it works, then use it to describe a zoo using sexy block syntax.
