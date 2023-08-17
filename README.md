# [andrewmiotke.com](http://andrewmiotke.com)

A personal site documenting my experiences, programming and IT work.

This site is built using [Hugo](https://gohugo.io) and hosted on GHPages.

Documentation can be found in the [wiki](https://github.com/miotke/andrewmiotke.com/wiki).

As of August 12, 2021 the "primary" branch has been renamed to `main`.

# Hugo

Theme: https://themes.gohugo.io/themes/devise/

## Starting server
- Start server without drafts: `hugo server`
- Start server with drafts: `hugo server -D` or `hugo server --buildDrafts`

## Create new post
- Create new draft post: `hugo new posts/<file-name>.md`

## Errors and fixes

Error:
```
WARN  found no layout file for "html" for layout "post" for kind "page": You should create a template file which matches Hugo Layouts Lookup Rules for this combination.
```

Solution:
```
git submodule init
git submodule update
```

# TIL

The TIL section is inspired by Simon Willson's [til](https://github.com/simonw/til)
