#!/bin/sh
docker compose exec backend sh -c "cd app && npm install && npm test" 