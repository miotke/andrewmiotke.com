"""
This script is meant to create a new post with the days date
and fill in the Jekyll front matter. 

The front matter is generated by the command line argument for the 
post title. The date is collected from the system date at time. 
This also dictates the file name for a new post.

USAGE: python new_post.py [post name]
"""


import os
from sys import argv
from datetime import date
from datetime import datetime


def main():
    # Variables that create the front matter.
    post_title = argv[1]
    path = '_posts/'
    file_name = f'{date.today()}-{post_title}'
    get_time = datetime.now()
    formatted_time = get_time.strftime("%H:%M:%S")
    extension = '.md'
    front_matter = f'''---
layout: post
title: "{post_title}"
date: {date.today()} {formatted_time} -0700
categories: update
---

'''

    new_post_file = f'{path}{file_name}{extension}'

    # Calls the create_git_branch function and passes
    # in the post_title.
    try:
        create_git_branch(post_title)
        print(f'🚀 Successfully create and checked out a new git branch: {post_title}')
    except:
        print(f'❌ Failed created a new git branch named {post_title}')

    # Creates the new post file and adds the Jekyll front matter.
    try:
        # Creates new post file using the new_post_file variable.
        # Stores the file in the _posts/ directory.
        os.system(f'touch {new_post_file}')

        # Opens new_post_file with read/write access
        # and writes the contents of the front_matter
        # variable at the top of the file.
        with open(f'{new_post_file}', 'r+') as f: 
            f.write(f'{front_matter}')

        # Prints to the console that a new file has been created.
        print(f'👍 {file_name} successfully created in _posts/.')
        os.system('code .')
    except: 
        print('😳 An error occured')


def create_git_branch(post_title):
    try:
        os.system(f'git push origin master:{post_title}')
    except:
        print(f'Failed to create and push new branch {post_title}')
    try:
        os.system(f'git checkout {post_title}')
    except:
        print(f'Failed to checkout branch: {post_title}')


if __name__ == "__main__": 
    main()
    