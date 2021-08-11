#/bin/bash

docker-compose exec web yarn migrate:down
docker-compose exec web yarn migrate:up
docker-compose exec web yarn seed:run
