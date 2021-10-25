#! /bin/bash

docker exec -it 71d2eb245ed9 psql -U postgres -f /setup/db.sql
