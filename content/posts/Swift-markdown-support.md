---
layout: post
title: "Swift: Markdown Support"
date: 2021-06-14 11:51:22 -0700
categories: Swift
---

Mardown support in Swift

<!--more-->

This year at WWDC 2021 Apple introduced Markdown support in its UI frameworks, which is awesome! I've used it only with SwiftUI so far but I expect Markdown support to be adopted by a lot of apps that have formatted text input.

This is a quick reference for supporting Markdown in your app.

Currently in SwiftUI `Text("**Here is a** [link to apple.com](https://apple.com)")` will render the Markdown without trouble. However, if you're fetching a String out of CoreData as was my case or you're calling a String from a `var` or `let` you may need a return that fetched string as an `AttributedString`.

## Markdown syntax

The Markdown syntax are familiar but if you're used to other flavors of Markdown then you might get tripped up. Below are some of the common Markdown commands available. I'll update this list as I find more commands

- ~~Strikethrough~~ == `~~Strikethrough~~`
- **Bold Text** == `**Bold Text**`
- `Monospace font` == \``Markdown Text`\`
- [Add links(goes to apple.com)](https://apple.com) == `[Link text](URL goes here)`

## Code sample

Call the `createAttributedString` function in your `Text()` view to render the markdown.

```swift
    let someString = "`Hey!` You're **awesome!**"

    // Takes in a string and returns an AttributedString
    func createAttributedString(_ markdown: String) -> AttributedString {
        do {
            let attributedString = try AttributedString(markdown: markdown)

            return attributedString
        } catch {
            print("Couldn't create an AttributedString: \(error)")
        }

        return AttributedString("error parsing markdown")
    }

    // Calls createAttributedString with the string passed in.
    Text(createAttributedString(someString))
```

This would return "`Hey!` You're **awesome!**"
