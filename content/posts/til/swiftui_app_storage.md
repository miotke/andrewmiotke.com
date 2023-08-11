---
layout: post
title: "Using SwiftUI's @AppStorage"
date: 2023-08-11 15:39:44 -0700
categories: til
---

**AppStorage is not a secure storage location**

You shouldn't use AppStorage for sensitive or personal information. AppStorage is really intended for app settings, such as theme (dark/light mode, etc).

Full code example below and the project can be downloaded at:

# Writing to @AppStorage

Writing to `@AppStorage` is fairly straight forward. Declare `@AppStorage` in one of your views as shown below. In this instance the thing we are storing is a `String`.

Example:
```swift
@AppStorage("username") var username: String = ""
```

# Reading @AppStorage

Reading `@AppStorage` is straight forward too. In this example we'll call our `username` variable in a different view by declaring the same `@AppStorage` line we used to write to AppStorage.

In the example below we put `@AppStorage("username") var username: String = ""` at the top of our view struct and can pass `username` into a Text view.

Example:
```swift
@AppStorage("username") var username: String = ""

var body: some View {
    Text("Username is: \(username)")
}
```

# Full code example

ContentView.swift
```swift
import SwiftUI

struct ContentView: View {

    @AppStorage("username") var username: String = ""

    @State var showUsernameForm: Bool = false

    var body: some View {
        NavigationView {
            Group {
                Text("Username is: \(username)")
            }
            .toolbar {
                ToolbarItem {
                    Button("Change username") {
                        showUsernameForm.toggle()
                    }
                    .sheet(isPresented: $showUsernameForm) {
                        UsernameForm(showUsernameForm: $showUsernameForm)
                    }
                }
            }
        }

    }
}
```

UsernameForm.swift
```swift
struct UsernameForm: View {

    @Binding var showUsernameForm: Bool

    @AppStorage("username") var username: String = ""

    var body: some View {
        NavigationView {
            Form {
                TextField("Username", text: $username)
            }
            .toolbar {
                ToolbarItem {
                    Button("Save") {
                        showUsernameForm.toggle()
                    }
                }
            }
        }
    }
}

```