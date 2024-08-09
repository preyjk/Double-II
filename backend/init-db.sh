#!/bin/sh

script_dir=$(dirname "$(readlink -f "$0")")
docker run -v ${script_dir}/config/aws:/root/.aws --network double-ii --rm amazon/aws-cli dynamodb create-table \
    --table-name Appointments \
    --attribute-definitions AttributeName=id,AttributeType=S \
    --key-schema AttributeName=id,KeyType=HASH \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
    --endpoint-url http://dynamodb-local:8000 \
    --no-paginate

docker run -v ${script_dir}/config/aws:/root/.aws --network double-ii --rm amazon/aws-cli dynamodb create-table \
    --table-name Users \
    --attribute-definitions AttributeName=username,AttributeType=S \
    --key-schema AttributeName=username,KeyType=HASH \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
    --endpoint-url http://dynamodb-local:8000 \
    --no-paginate

docker run -v ${script_dir}/config/aws:/root/.aws --network double-ii --rm amazon/aws-cli dynamodb create-table \
    --table-name Doctors \
    --attribute-definitions AttributeName=id,AttributeType=S \
    --key-schema AttributeName=id,KeyType=HASH \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
    --endpoint-url http://dynamodb-local:8000 \
    --no-paginate

docker run -v ${script_dir}/app:/app -w /app --network double-ii --rm node:20 node test/insert-example-data.js