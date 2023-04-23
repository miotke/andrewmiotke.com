---
layout: post
title: "Learning Cron: My notes"
date: 2021-07-22 15:02:30 -0700
categories: update
---

These notes are not exhaustive. As I learn more I'll try and update this post. 

Cron jobs are useful for running automated tasks in Linux based environments. The syntax is kind goofy and took me reading a few different articles to really grasp it. I found this great article, [Writing a basic cron job in Linux](https://techgirlkb.guru/2018/10/writing-a-basic-cron-job-in-linux/) which really helped give a good understanding on how the astrisk syntax works. 

```cron
# ┌───────────── minute (0 - 59)
# │ ┌───────────── hour (0 - 23)
# │ │ ┌───────────── day of the month (1 - 31)
# │ │ │ ┌───────────── month (1 - 12)
# │ │ │ │ ┌───────────── day of the week (0 - 6) (Sunday to Saturday;
# │ │ │ │ │                                   7 is also Sunday on some systems)
# │ │ │ │ │
# │ │ │ │ │
# * * * * *
```

## Resources 

- [Writing a basic cron job in Linux](https://techgirlkb.guru/2018/10/writing-a-basic-cron-job-in-linux/)
- [Validate cron jobs](https://crontab.guru/)
- [CronJob](https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/#cron-schedule-syntax)

## Listing out current cron jobs

#### Command: 
- `crontab -l`

## Compose new cron job

#### Command: 

- `crontab -e`

You may be asked on the first run which editor to use between Nano and a couple variations of vim.

## My uses
I wanted a cron job to run spin up a docker container on my Raspberry Pi at 2pm(PST) Monday - Friday. This seemed like it worked so far, on the first day. 
`0 14 * * 1,2,3,4,5 docker run [docker image]`
