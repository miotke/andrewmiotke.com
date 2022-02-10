---
layout: post
title:  "Portfolio App: Meal Time"
date:   2020-04-22 15:36:46 -0700
categories: Apps
---
### Update

As I outlined in [A New Hope](http://andrewmiotke.com/update/2020/03/31/a-new-hope.html) I'm taking
this time to refocus my software development efforts on iOS and Swift. It's been about a week and a half
since I was laid off of my job and I have taken it in stride. I've decided to work on a few different types of
apps, some "portfolio" that won't be released on the App Store and at least one that will be released on the App Store.

### Introducing: Meal Time
Meal Time is the first "portfolio" app that I've built during this jobless time. I started this idea some time ago
but never "finished" it until now(finished is in quotes because there's always things I could change).

I was curious how the whole app ecosystem worked, that being a web api and mobile app. I used the Django
REST framework to build the api and hosted that api was deployed to Heroku's free tier. I then build an iOS app using Swift to consume the data this api was serving.
The app would display the menu title, price, and a description then display it in the app. I used a simple root view and detail view
to navigate around and get more information.

If you look at the detail view, all the meal UILabels including the UIImage(it's just an emoji) are all populated
by data coming from the Django REST api.

If you would like to check it out in more detail feel free to head over to the [Meal Time](https://github.com/miotke/MealTime) repository on GitHub.

<p align="center">
  <img src="/images/MealTimeVideo.gif">
</p>

Disclaimer: This app is not fully featured and will not actually order anything 😉

Thanks for reading!


[jekyll-docs]: https://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/
