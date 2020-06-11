#!/usr/bin/env python
import shutil
import os

def main():
	src_dir = "/Users/andrewmiotke/GitHub/andrewmiotke.com/resume.md"
	destination_dir = "/Users/andrewmiotke/GitHub/gist_resume/Resume.md"
	test_dest = "/Users/andrewmiotke/Desktop/"
	test_file = "/Users/andrewmiotke/Desktop/Resume.md"
	strip_lines = """
				---
				layout: default
				title: Resume
				navigation_weight: 2
				---
				"""	

	shutil.copy(src_dir, test_file)
	print(strip_lines)	

	a_file = open(test_file, "r")
	lines = a_file.readlines()
	a_file.close()
	
	del lines[0]
	del lines[1]
	del lines[2]
	del lines[3]
	del lines[4]

	new_file = open("Resume.md", "w+")
	for line in lines:
		new_file.write(line)
	new_file.close()

if __name__ == "__main__":
	main()

