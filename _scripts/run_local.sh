#!/bin/bash
docker stop website
docker image prune
docker container prune
docker build -t website .

docker run -p 8080:80 --name website website 