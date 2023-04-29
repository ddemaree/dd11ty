---
title: 'Two Domains, One Google Apps'
date: 2012-02-03T22:08:36.000Z
subtitle: ''
---
Since almost the beginning, Google Apps has worked like this:

-   Every account has one domain name (let's call it _yourdomain.com_) that users use to log into their mail/calendars/etc, which Google calls the _primary domain name_. You set this up when creating your Google Apps account, and for all intents and purposes it can _never_ be changed.
    
-   Accounts can also have one or more _domain aliases_. Let's say in addition to _yourdomain.com_ you also have _yourdomain.net_, and you want emails sent to _[david@yourdomain.net](mailto:david@yourdomain.net)_ to end up in the same mailbox as those sent to _[david@yourdomain.com](mailto:david@yourdomain.com)_. You'd log into your Google Apps control panel and add _yourdomain.net_ as a domain alias for _yourdomain.com_, and _voila_, it works (well, as soon as you've completed the absurdly complicated ownership verification and MX record setup steps).
    

But let's say you (or your business) has a _third_ domain name, _kittensareawesome.com_, and you want to set up the email account _[david@kittensareawesome.com](mailto:david@kittensareawesome.com)_, _but_ you don't want emails sent to that address to go to the same place as _[david@yourdomain.com](mailto:david@yourdomain.com)_ — in other words, you want mailboxes on _kittensareawesome.com_ to be entirely separate from the ones on _yourdomain.com_ or _yourdomain.net_.

For most of its history, Google Apps had no way of letting you do this without creating a second, separate Google Apps account for _kittensareawesome.com_. But today I discovered that is no longer the case: **Google now lets you add additional domains to a single Google Apps account**.

In a minute I'll explain why you might want to do this, but first, here's a guided tour of how to add an additional, non-alias domain to your account:

1.  Log into your Google Apps control panel.
    
    This is always located at [http://google.com/a/YOURDOMAIN.COM](http://google.com/a/YOURDOMAIN.COM). You'll need to log in with the username and password you created when you initially set up Google Apps; this will usually be the same as your first/primary Gmail mailbox, and in fact you can usually get to this page more easily by logging into your Google Apps Gmail and clicking on 'Manage My Domain'.
    
2.  Click on **Domain Settings**.
    
    ![](http://media.tumblr.com/tumblr_lytu89JpkB1qaztlp.png)
    
3.  Then click on the tab labeled **Domain names**.
    
    ![](http://media.tumblr.com/tumblr_lytu7kVvSG1qaztlp.png)
    
4.  Click on the link labeled **Add a domain or domain alias**.
    
    ![](http://media.tumblr.com/tumblr_lytu74kYIT1qaztlp.png)
    
5.  Finally, on the next screen, check the second-from-top radio button, labeled **Add another domain**.
    
    ![](http://media.tumblr.com/tumblr_lytu5zHC9a1qaztlp.png)
    

Then you click the button labeled **Continue and verify domain ownership**, which takes you through the same annoying steps you have to follow any time you ask Google to do anything with a domain name that's not `google.com`.

Once you've verified ownership and set up MX records (or had a friendly nerd in your office do it), you should be able to come back to the control panel and add users to _either_ `yourdomain.com` or `kittensareawesome.com`. (Or, in my case, `demaree.me` _or_ `practical.cc`.)

To add a new mailbox on the new, second domain, go into your _Organization & users_ tab and create a new user. You'll now see a handy drop-down menu letting you choose which domain the new user should belong to:

![](http://media.tumblr.com/tumblr_lytu5hBmxz1qaztlp.png)

### Why did I need this?

Years ago when I started doing freelance work, my main personal domain name was `practicalmadness.com` and — being 24 years old and _brilliant_ — I decided it would be sensible to set up my business on the far-too-similar, not-remotely-professional `practicalmadness.net` domain, and created a Google Apps account for it.

Not long after that I came to my senses and changed my business domain to the shorter, simpler `practical.cc`. But by then I had plenty of mail (and inertia) built up in the old `practicalmadness.net` account, and at that time Google was somewhat stingy about letting users create multiple Apps accounts. So for years I've had to keep that domain going — and have kept paying for renewals every year — just because it was attached to my old freelancing business's email account.

I started looking into this today because `practicalmadness.net` comes up for renewal in about 2 weeks, and this year I decided to let it lapse. But I still use `practical.cc` for a number of things, so I wanted that to remain active.

A quick side note before I continue: one thing I learned after Adobe acquired Typekit — and turned our `typekit.com` Google email accounts into `adobe.com` Exchange ones — is that Google _does not care_ if the primary domain on a Google Apps account stops working. Even though Google is no longer receiving mail at `typekit.com`, we can still log into those Apps accounts to search our mail archives or use non-Mail services such as Google Docs.

So if I didn't mind having a second Apps account, or the cognitive dissonance of logging into it with an email address that no longer works, I could have simply let the domain lapse. `practical.cc` was set up as an alias and would have continued to function even after `practicalmadness.net` went away.

But now that I know I can manage all my domain names from a single Google account, that's the way I want it.

### Caveat nerdor

The first small complication: the domain I wanted to add to my Google Apps account at `demaree.me` was already associated with my other Apps account at `practicalmadness.net`. Google won't let you add a domain to two accounts at once. Here's what I did:

1.  I logged into the `practicalmadness.net` control panel and deleted `practical.cc` as an alias domain.
2.  Then I switched to the `demaree.me` admin and went through the steps to add `practical.cc` as an additional, non-alias domain (as described above).
3.  Finally, I then _immediately_ added a new `david@practical.cc` mailbox on the `demaree.me` account.

Google says domain changes can take up to 30 minutes to take effect, but in my case they were virtually instant, and I immediately started receiving emails in the new Gmail account.

A couple of _big_ caveats to doing what I did:

-   The new account is a _totally_ new, empty Gmail account. None of my filters, labels, settings, or messages made the transition to the new mailbox.
    
    When I set out to make this change, I'd originally planned to implement some complicated migration plan, in which I used GData or IMAP to copy all the mail from the old mailbox to the new one. But my experience with the `typekit.com` mail made me realize: I don't need to. All the old mail will remain in the old `practicalmadness.net` account (which remains active, even though it no longer receives new messages), and I can always log in if I need to retrieve something from my archives. If it turns out I need to move over something important, I can figure that out later.
    
-   If you receive a high volume of mail on an address you want to move between Google accounts, I might recommend against doing this switcheroo during business hours. Or, if you pay for a Google Apps business/enterprise account, I recommend contacting Google's customer support to ask if they can help you do it safely.
    
    I say this because I quite frankly have _no idea_ what may have happened to any messages received during the 60-or-so seconds between when I removed my domain in one place and added it in another. That address receives a low volume of mail so in my case it was harmless, but it may not be harmless for you. _Caveat nerdor_.
    

Now that all that's done, I'm pretty happy to have one fewer Google Apps account in my life, and now I'm looking to see if I can eliminate some other ones.

Questions? Hit me up on Twitter at [@ddemaree\_old](http://twitter.com/ddemaree_old) or email me at [david@demaree.me](mailto:david@demaree.me?subject=Google+Apps+FTW).
