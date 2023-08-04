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

To get your new CLI too ready to start building add the following to your package.swift file.

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

4. Add the target platforms to the package constant. e.g.
    ```swift
    // Sets the target platform to macOS 13+
    platforms: [.macOS(.v13)],
    ``````
# Create a basic CLI tool with ArgumentParser

Next we're going to create a simple CLI tool that takes in 1 required argument and 1 optional requrement using Apple's [ArugmentParser](https://github.com/apple/swift-argument-parser) package. Note that this package was already configured in our _package.swift_ file.

Open the project in Xcode and in the _Sources_ directory rename or create a new file; don't name it _main.swift_ otherwise we won't be able to use the `@main` property wrapper. In this example we'll name the file _CliSwift.swift_

## _CliSwift.swift_

1. Import `Foundation` and `ArgumentParser` so that we get access to both libraries.
2. Next we'll create a struct named `CliSwift` and conform to `AsyncParsableCommand`. This conformance is necessary for this simple example, however if you want to make a CLI tool that's more useful, having Swift's async/await functionality can be useful.
3. Give the `CliSwift` struct the `@main` property wrapper. This tells the compiler that this struct is the entry point of your app.
4. Conformance to `AsyncParsableCommand` requires that we have add a `func run() async throws { }` method to our struct.
5. Inside the struct we'll add `@Argument(help: "")` with a variable of `name` which is a String. The `@Argument` property wrapper takes a String, this String gives the user some information about this required argument.

    e.g. when running `cli_swift -h`
    ```swift
    ARGUMENTS:
    <name>                  Enter the your name
    ```
6. If we want to add an optional argument then we can use the `@Option(help: "")` property wrapper with a variable and it's type. We will mark the variable as optional using `?` lie so
    ```swift
    @Option(help: "Enter your age")
    var age: Int?
    ```
7. Inside the `run()` method, we can do any type of operation on those arguments by calling their variable name. See the full code sample below.
    ```swift
    import Foundation
    import ArgumentParser

    @main
    struct CliSwift: AsyncParsableCommand {
        @Argument(help: "Enter the your name")
        var name: String

        @Option(help: "Enter your age")
        var age: Int?

        func run() async throws {
            print("Your name is \(name)!!!")
            print("Your age is \(age ?? 0)")
        }
    }
    ```
# Create arguments for testing.

You can run your code at any time but if you have required arguments, you will get an error and the help dialog will be displayed.

    Error: Missing expected argument '<name>'

    USAGE: cli-swift <name> [--age <age>]

    ARGUMENTS:
    <name>                  Enter the your name

    OPTIONS:
    --age <age>             Enter your age
    -h, --help              Show help information.

    Program ended with exit code: 64


1. To create arguments for testing click the target at the top of Xcode and select _Edit Scheme..._. Under Run click the + under _Arguments Passed On Launch_. These arguments need to be in order, top to bottom as they appear in your app with optional arguments above the optional argument value.
2. Close the _Edit Scheme..._ window and try running your app again. The output should now have your argument values

    ```
    Your name is gus!!!
    Your age is 13
    Program ended with exit code: 0
    ```

# Running your CLI tool from the command line.

* During development you can use `swift run cli_swift <argument value> --<optional argument name> <optional argument value>` to build and run on the command line.
* You can build using `swift build` in the working directory of your source code. This will put an executable in a hidden _.build/debug_ folder of your current path.

# Archiving your build

Once you're ready for a final release you can Archive the build using Xcode.
1. In Xcode, select Product > Archive in the menu bar.
2. Once built select Distribute Content and follow the prompts.
3. Select Built Produdcts for your method of distribution and select where to save it on your Mac. It will create a new folder with the products name and date of the build. Click Export.
4. You can find your new CLI executable binary in the Products/usr/local/bin/ path of your working directory
    ```
    ~/Desktop/cli_swift> tree .
    .
    ├── Package.resolved
    ├── Package.swift
    ├── Sources
    │   └── CliSwift.swift
    └── cli_swift 2023-08-03 15-14-54
        └── Products
            └── usr
                └── local
                    └── bin
                        └── cli_swift
    ```