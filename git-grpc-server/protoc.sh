#! /bin/sh

for FILE in ./proto/*;
    # do protoc --python_out=./src $FILE 
    do python3 -m grpc_tools.protoc -I./proto --python_out=./src --grpc_python_out=./src $FILE 
    done