#! /bin/sh

for FILE in ./proto/*;
    # do protoc --python_out=./src $FILE 
    do python -m grpc_tools.protoc -I./proto --python_out=./src/proto_output --grpc_python_out=./src/proto_output $FILE 
    done