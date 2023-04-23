---
layout: post
title: "SwiftUI: List Card View"
date: 2021-06-14 10:48:41 -0700
categories: Swift UI
---

To be upfront, I'm not sure if calling each row a "card" is the best way to describe this but, it seems reasonable to me.

Creating a "card" within a List view using SwiftUI was something that always seemed super hacky to me until [@mecid](https://twitter.com/mecid) replied with a very concise and obvious answer. Simply, create a List with the `.listStyle(InsetGroupedListStyle())` modifier and for each row within the list, give it a `Section`.

<!-- <p align="center">
  <img src="/images/mecid_creating_card.png">
</p> -->
<!-- {{ $image := resources.Get "images/root.jpg" }}
{{ $image := .Resources.GetMatch "root.jpg" }} -->
{{ with .Resources.GetMatch "root.jpg" }}
  <img src="{{ .RelPermalink }}" width="{{ .Width }}" height="{{ .Height }}">
{{ end }}
## Code sample

The code below has a List with a ForEach loop. Within the loop a Section is created and inside the Section is the row content. Obviously the row content can have anything you like in there. If you wanted to create a more complex row you could extract that out into its own view and pass that into each section within the loop.

```swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        List {
            ForEach(0..<5) { i in
                Section {
                    Text("A new row \(i)")
                }
            }
        }
        .listStyle(InsetGroupedListStyle())
    }
}
```

<p align="center">
    <img src="/images/list_card_example.png">
</p>

A caveat that I found, which might be somewhat obvious, is you can't have a Section within a Section. For example: if you had a todo list with a "Completed" and "Not completed" sections those rows could not be broken apart into a separate "card" per row using this example.

```swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        List {
            Section(header: Text("Completed")) {
                ForEach(0..<5) { i in
                    Section {
                        Text("A new row \(i)")
                    }
                }
            }

            Section(header: Text("Not completed")) {
                ForEach(0..<5) { i in
                    Section {
                        Text("A new row \(i)")
                    }
                }
            }

        }
        .listStyle(InsetGroupedListStyle())
    }
}
```

The code above will give you multiple sections however each section's row will not be separated. The output of the above code example would be this. Which doesn't look bad.

<p align="center">
  <img src="/images/nested_sections.png">
</p>