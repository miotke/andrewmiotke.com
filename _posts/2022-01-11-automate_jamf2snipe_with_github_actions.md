---
layout: post
title: "Automate jamf2snipe with GitHub Actions"
date: 2022-01-13 16:30:23 -0700
categories: Mac Admin
---

[Snipe-IT](https://snipeitapp.com) is a great asset tracking tool for IT teams and if you use Jamf to manage Apple devices then you probably want an easy way to sync those objects from Jamf into Snipe-IT. That's where [jamf2snipe](https://github.com/ParadoxGuitarist/jamf2snipe) comes in, written by [ParadoxGuitarist](https://github.com/ParadoxGuitarist) on GitHub.

In this post we're going to walk through using GitHub Actions to automate running jamf2snipe on a regular cadence.

We're going to assume that you already have jamf2snipe set up and it can run from your local machine and you have a forked copy of jamf2snipe in GitHub. Checkout jamf2snipe's README for instructions on how to configure the script.

_Disclaimer:_ I'm sure there's a better way to handle this but this is the approach I took and it's worked out pretty well so far.

## The problem

Running jamf2snipe from a local machine requires a human to remember (with the help of a Slack reminder) to run the jamf2snipe script in some interval.

This seems like a great opportunity to automate a tedious and repetitive task. I want this script to run nightly so that our Snipe-IT data is always up to date the next morning.

## Setting up the GitHub Action

First of all we need to set up a new action.

1. Click on the Actions tab in your GitHub repo and click the "set up a workflow yourself ->" link. This creates a new directory and file in your repository, `.github/workflows/main.yml`.
2. You can either edit or delete all of the yaml that GitHub supplies in the new workflow file. If you want, you can change the name of the file from `main.yml` to anything you want, just make sure you give it the `.yml` extension.
3. Below is a sanitized and commented version of the `.yml` file I use. Feel free to copy and change it as you see fit.
4. **Secrets**, this is probably the most important step! Make sure you follow the instructions in the jamf2snipe README for setting up your secrets in the settings.conf file. To make your GitHub Action work, you need to add these secrets to either your GitHub org or repository's secrets. The secrets outlined in the yaml are passed to the setting.conf file that jamf2snipe requires.
    - To access those secrets in the Action's yaml file use `${{secrets.[your_secret_name]}}`.
    - In the example below username and password are the "service account" credentials from Jamf.
5. Other notable things in this yaml file are the various `- run` commands, we'll describe those below.
    - Since we're using an Ubuntu runner we need to create the `/opt/jamf2snipe/` directory. This path is documented in the jamf2snipe README as the first place jamf2snipe will check for the settings.conf file.
    - Then we copy the settings.conf file to `/opt/jamf2snipe/`.
    - And finally we run jamf2snipe. The flags that are passed in are optional, again, reference the jamf2snipe README to learn more about each option.
        - If you use the `-v` (verbose) flag, all jamf2snipe output will be shown in the GitHub Action's build output.

```yaml
name: Run jamf2snipe script
on:
  schedule:
    # Schedules this action to run at 5pm PST Monday - Friday
    - cron: '0 1 * * 1-5'
jobs:
  build:
    runs-on: ubuntu-latest
    env:
      username: ${{ secrets.username }}
      password: ${{ secrets.password }}
      snipe_it_api_key: ${{ secrets.snipe_it_api_key }}
    steps:
      # Checks out the your repo
      - uses: actions/checkout@v2

      # Set up the environment to use Python 3.8.9 and installs
      # all required dependencies in requirements.txt
      - uses: actions/setup-python@v2
      - uses: BSFishy/pip-action@v1
        with:
          requirements: requirements.txt
          python-version: '3.8.9'

      # Creates a new directory in the Ubuntu runner
      - run: mkdir /opt/jamf2snipe/

      # Copies the settings.conf file into the newly created directory
      - run: cp settings.conf /opt/jamf2snipe/

      # Runs the jamf2snipe script with the designated arguments
      - name: run jamf2snipe script
        # The jamf2snipe command you run can whatever works best for your use.
        # Using the -v flag will put all output in the GitHub Action build output.
        run: python jamf2snipe -v --do_not_update_jamf -uf
```

If you read this then I hope it helped or if you know of a better way to handle this process, please let me know.
