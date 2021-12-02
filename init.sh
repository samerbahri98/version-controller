#! /bin/sh

mkdir ./git/vol
g++ -std=c++17 -o ./DockerImages/git/manipulate_keys ./git/actions/manipulate-key.cpp

docker-compose up -d --build
./db.sh
