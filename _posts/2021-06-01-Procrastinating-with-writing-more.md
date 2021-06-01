---
layout: post
title: "Procrastinating with writing more"
date: 2021-06-01 14:52:51 -0700
categories: update
---

I have decided I want to write more. I'm just not sure what, if any, focus I want to have with it. Tech will be the primary focus leaning toward writing code and other tech opinions that come to mind. 

 This post is my attempt at getting back into writing. In typical form, I found myself sitting down with a cup coffee yesterday morning ready to go. Then I thought about a problem I had and wrote a Python script to solve that problem. A classic procrastination moment, sit down to write a post and instead write some code to solve such a minor problem to begin writing. 

 So what did that script do? It was simple, I wanted a script that would take an argument as the post title, create the markdown file, get the system date and time, and stuff all of that in the appropriate meta-data/front matter locations. This site is built on Jekyll and Jekyll uses some meta-data at the top of each post called "front matter". This front matter contains a bunch of information about the post, things like what category the post is related to, the date in which it was created, and the title. Yes, of course I could have just copy and pasted a previous post and filled that front matter in accordingly but, there's no fun in that. So I decided to make it significantly more complicated and automate it. 

Since creating the markdown file and updating the front matter worked pretty well I decided become even lazier have the script handle all the git commands as well. I'm very particular when it comes to version control, it might be a fault at this point. I want to create a new branch with the post title and push that branch to GitHub. The command being used to create the new branch and check it out is `git push origin master:[new branch name]`. If you want to see the script you can find it [here](https://github.com/miotke/andrewmiotke.com/blob/master/new_post.py).

So far this script is working exactly as I would expect. It even gave me the added bonus(?) of allowing me to procrastinate on actual writing and instead, write some code. 