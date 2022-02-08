---
layout: post
title:  "First App in TestFlight: Tankd"
date:   2020-05-20 09:29:46 -0700
categories: Apps
---

I finally did it! Earlier this week I submitted an app to TestFlight for the first time. This is the first step in achieving my goal of submitting an app to the iOS App Store and I could not be more excited. I'll talk more about the app in a moment with a link so you can download it. I'm hoping to let it bake with testers in TestFlight to work out all the kinks and bugs then move it to the App Store soon.

This isn't the initial app I wrote about after getting laid off, in fact it's something much smaller but serves a purpose that didn't exactly fit in with my other app. It's also written with SwiftUI, Apple's new UI framework, which I have mixed feelings about currently.

### Tankd
So the app is called Tankd and simply put it's a fuel stop tracking app for iOS. I had heard a few times and even talked to a few friends who like to save their receipts at every fuel stop they make. I tried this for a short bit and got frustrated with all of the receipt papers cluttering up areas like the glove box. There's also spreadsheets which would solve this problem just as easy. However, I thought I could try and make a more eloquent way of tracking fuel stops and maybe, eventually, present the data as more of an overview like a dashboard.

Feel free to download the TestFlight build [here](https://testflight.apple.com/join/XCcpPOnr)! I would love to hear your feedback and bug reports as well 🐞.



<p align="center">
<img src="/images/root.jpg">
<img src="/images/add_fuel_stop.jpg">
</p>

### SwiftUI and other technologies
SwiftUI is a brand new UI framework from Apple that was announced and released at WWDC 2019. It's declarative and super cool. You can build some really nice looking UIs and apps with it very quickly but it's not perfect and has its flaws. Honestly, with the size and complexity of Tankd it seems like a good candidate to really dip my toes into SwiftUI. I ran into a variety of bugs and issues when building Tankd mainly with wrapping my brain around writing UI in a declarative way vs an imperative way like you would from UIKit. Describing how you want your UI to look is a really nice way to quickly get something on screen, looking nice, and letting the system deal with the constraints.

In Tankd I also used Core Data as the persistent data store. SwiftUI made a simple Core Data implementation really simple and I really enjoyed using Core Data with SwiftUI.


Again, thanks for reading :)


[jekyll-docs]: https://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/
