#!/bin/sh
script_dir=$(dirname "$(readlink -f "$0")")
docker run -it --rm -v $script_dir/lambda/appointment:/app -w /app --network double-ii node:20 npm test -- --timeout 10000