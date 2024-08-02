#!/bin/sh
script_dir=$(dirname "$(readlink -f "$0")")
docker run --rm -v $script_dir/lambda/appointment:/app -w /app --network double-ii node:20 sh -c "npm install && npm test -- --timeout 10000"