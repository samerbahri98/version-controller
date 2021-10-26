#! /bin/bash

docker exec -it db psql -U postgres -f /setup/db.sql

if [ "$1" = "mock" ]
then
    docker exec -it db psql -U postgres -f /setup/dummydata.sql
fi
