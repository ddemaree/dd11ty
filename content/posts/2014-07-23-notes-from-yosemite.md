---
title: Notes from the OS X Yosemite beta
slug: notes-from-yosemite
modified: '2021-05-22T22:02:27.000Z'
date: '2014-07-23T16:40:55.000Z'
tumblr_url: 'https://ddemaree.tumblr.com/post/92642649919/notes-from-yosemite'
---
About a week ago, I broke one of my own rules and installed an early developer preview of OS X Yosemite on my regular, day-to-day, work-issued Mac laptop. I had previously promised myself I’d at least wait until the public beta, on the theory that no matter how many caveats Apple gives the million or so beta participants, enough everyday users are likely to start using the new OS that at the very least it shouldn’t totally hose one’s computer. Well, it turns out my timing was almost perfect: Yosemite was installed for less than 4 days before Preview 4 came out, and it seems that the Preview 4 build will be the first public beta release, coming out tomorrow. If you’re among the lucky million-or-so who’ll receive a beta channel code from Apple tomorrow, some things to know, based on a week or so using the OS day to day:

### Old iCloud vs New iCloud

The most recent iOS and Yosemite betas have added UI that supports both the “old” iCloud document syncing (called “Documents & Data”) and the new iCloud Drive. What you need to know is: _these two things are not compatible_, and moving from Docs & Data to iCloud Drive is a one-way move on each device. What this means in practice is that Macs or iOS devices that have made the switch to Drive can still talk to each other, but only if they’re _both_ running beta software and _both_ have enabled New iCloud. Otherwise, your apps will still work, but they’ll be talking to different iCloud backends and therefore will lose the ability to sync with each other. AFAIK, Apple plans to migrate any data stored in Old iCloud into folders on iCloud Drive when the service launches this fall, so nobody’s data will be lost—it’ll just be inconvenient to access it. In theory, if you enable iCloud Drive but all your iCloud-enabled apps still expect the old Docs & Data syncing to work, everything _should_ still work. Behind the scenes, Apple is simply directing apps’ requests for Docs & Data resources over to iCloud Drive, where your files will appear as special managed folders in OS X and (eventually) the new iOS document picker. In practice, there are probably plenty of bugs that will mean iCloud will be even flakier than usual until everything shakes out. If in doubt, follow Apple’s advice and just don’t enable iCloud Drive until it ships. I have it enabled on my Mac, and can tell you it’s pretty neat, but if you use Dropbox or anything similar it’s nothing you haven’t seen before. Dropbox, by the way, generally works great on Yosemite. I did see some issues on Preview 3 where the Desktop app will hang and need to be relaunched, but upon relaunch everything was back to good, and I haven’t had to do that again since installing Preview 4.

### Dark Mode = meh

Maybe there’s some third-party support that’ll make it more compelling, but so far, not only is the dark UI theme for the title bar and Dock unimpressive, because menu extras and other apps are designed to assume a light background, switching into dark mode tends to make things look bad. Unless there’s some master plan I’m not aware of, it’s superfluous enough to make me wonder if Apple won’t just yank the feature before Yosemite ships.

### How’s Helvetica Neue as a system font?

I’ve gotten this question from a fellow type nerd at work, and my answer is: it’s a mixed bag. First, the good: Helvetica Neue is a much more versatile font than Lucida Grande, giving app designers a much broader range of typographic expression. Of course, most people will abuse the weight I fondly call Helvetica Neue Extra Stupid Light, but generally I think it’ll be great for the system font to support more than 2 weights (and to have italics!). On the other hand, Lucida Grande is a true screen type workhorse, and Helvetica Neue is not nearly as good, legible, or crisp, especially at tiny point sizes or on non-Retina displays. Having used Yosemite for a few days on both a retina MacBook Pro and a non-retina Thunderbolt Display, I’ve stopped noticing the difference, and my current opinion is that trading off optimum legibility for a more expressive range of type styles and weights is worth it. But this will probably remain controversial, especially for people whose only Mac screen is a tiny, non-retina MacBook Air that will now be full of (relatively) smeary Helvetica type.