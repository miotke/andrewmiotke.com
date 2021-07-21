---
layout: post
title: "Learning Docker: My notes"
date: 2021-07-21 15:21:59 -0700
categories: update
---

Expect this post to be updated over time. 

Here are the notes I've taken so far while learning Docker over the last few days. 

# Learning Docker

## Resources 

- [Docker for beginners](https://docker-curriculum.com/)

## docker pull

##### Command: 
- `docker pull [image name or url]`

Pulls the docker image from the docker registry. The docker registry is similar to Github in that it hosts a bunch of docker images. 

Use `docker images` to list all of the images on the local machine. 

## docker run

#### Command: 
- `docker run [image name]`

#### Flags

- `-d` detaches the terminal window from the running docker container.
- `-P` publishes all exposed ports to random ports so that the application inside the container can be accessed. You can also specify which port to use with `docker run -p 8888:80 ...`.
- `--name` gives the container a human readable name. 

Runs a docker container based on the image that is passed in. 

`docker run -it [image name]` attaches you to an interactive shell in the container itself. 

## docker stop

#### Command: 
- `docker stop [container ID or name]`

Stops the running container when running in detached mode. 

## docker ps

#### Command: 
- `docker ps`

#### Flags:
- `-a`shows all containers that have been run.

Shows all of the containers that are currently running. Docker creates a new container everytime the command is run. That way the environment is always as you expect. 

## docker rm

#### Command: 
- `docker rm [container ID]`

Container stick around on the disk even after they are no longer running and have a STATUS of `Exited`. Run `docker ps -a` to get the container ID then run `docker rm [container ID]`, i.e. `docker rm 605982f999a1`.

You can also pass in the `--rm` flag during the `docker run` command to delete the container after it's been ran. i.e. `docker run --rm busybox echo "Hello"`.

`docker container prune` will delete all exited containers at once. This way you don't need to copy and paste each container ID in the `docker rm` command.

To get a list of containers use `docker ps` for active containers or `docker ps -a` for all containers that are currently running, exited, ect. 

## docker rmi

#### Command: 
- `docker rmi [image name]`

Deletes the docker image you no longer need. 

To get the list of images use `docker images`.

## Dockerfile

Dockerfile reference: https://docs.docker.com/engine/reference/builder/

A _Dockerfile_ is a text file that outlines what a docker image should look like. It contains a list of commands that docker uses to build and create an image which can later be used to create a container. 

Creating a Dockerfile by just creating a new file named `Dockerfile`.

Example Dockerfile I used from [Docker for beginners](https://docker-curriculum.com/)

```Dockerfile
# Specify the base image first.
FROM python:3

# Set a working directory for our app
WORKDIR /usr/src/app

# Copy all the files to the container 
COPY . .

# Install Python dependencies using the requirements.txt file
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port that the app will run on
EXPOSE 5000

# Run the command for running the application
CMD ["python", "./app.py"]
```

## docker build

#### Command: 
- Create a local docker image`docker build [dockerhubUsername/image name] [location of Dockerfile]`

#### Flags

- `-t` to give the image a specific tag. Generally a version number.

`docker build` creates a docker image out of the Dockerfile. To add a tag the docker image use `:[tag name]` after the image name, `docker build [dockerhubUsername/image name]:[tag name] [location of Dockerfile]`

## docker push

#### Command: 
- `docker push [dockerhubUsername/image name]`

Pushes the docker image to DockerHub.
