---
layout: post
title: "macOS repeat key strokes in VSCode/VSCodium"
date: 2023-11-14 15:38:32 -0700
categories: til
---

Using the vim or neovim plugin in VSCode or VSCodium does not allow you to hold a key and have that key repeat. The commands below will allow for that behavior on macOS.

## VSCodium

```sh
defaults write -app VSCodium ApplePressAndHoldEnabled -bool false
```

## VSCode

```sh
defaults write com.microsoft.VSCode ApplePressAndHoldEnabled -bool false
```
