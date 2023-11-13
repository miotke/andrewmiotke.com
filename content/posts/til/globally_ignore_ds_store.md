---
layout: post
title: "Globally ignore .DS_Store with Git"
date: 2023-11-13 15:43:51 -0700
categories: til
---

Settings for git to ignore `.DS_Store` globally on macOS.

```
git config --global core.excludesfile ~/.gitignore

echo .DS_Store >> ~/.gitignore
```