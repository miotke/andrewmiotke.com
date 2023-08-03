---
layout: post
title: "CLI Tools with Swift"
date: 2023-08-03
categories: Swift CLI Tools
---

# Getting started writing a CLI tool with Swift

## Start project

1. Start by making a new directory, `mkdir <path/to/dir>`
2. Run `swift package init --type executable`. This creates an executable package that can be opened in Xcode or any text editor

## Prepare `package.swift`

1. Add a `products` array the package constant. e.g.
```swift
products: [
    .executable(name: "cli_swift", targets: ["cli_swift"])
],
```

2. If you're adding any dependencies such as other Swift packages, add a `dependencies` array to the package constant e.g.
```swift
dependencies: [
    .package(url: "https://github.com/apple/swift-argument-parser", exact: "1.2.2")
],
```

3. Add a `dependencies` array to your `targets` array. e.g.
```swift
.executableTarget(
    name: "cli_swift",
    dependencies: [.product(name: "ArgumentParser", package: "swift-argument-parser")],
    path: "Sources"
),
```
