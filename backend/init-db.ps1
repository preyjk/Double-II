# 定义脚本目录
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

# 使用 PowerShell 语法的 Docker 命令
docker run -v "$scriptDir/config/aws:/root/.aws" --network double-ii --rm amazon/aws-cli dynamodb create-table `
    --table-name Appointments `
    --attribute-definitions AttributeName=id,AttributeType=S `
    --key-schema AttributeName=id,KeyType=HASH `
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 `
    --endpoint-url http://dynamodb-local:8000 `
    --no-paginate

docker run -v "$scriptDir/config/aws:/root/.aws" --network double-ii --rm amazon/aws-cli dynamodb create-table `
    --table-name Users `
    --attribute-definitions AttributeName=username,AttributeType=S `
    --key-schema AttributeName=username,KeyType=HASH `
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 `
    --endpoint-url http://dynamodb-local:8000 `
    --no-paginate

docker run -v "$scriptDir/config/aws:/root/.aws" --network double-ii --rm amazon/aws-cli dynamodb create-table `
    --table-name Doctors `
    --attribute-definitions AttributeName=id,AttributeType=S `
    --key-schema AttributeName=id,KeyType=HASH `
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 `
    --endpoint-url http://dynamodb-local:8000 `
    --no-paginate

docker run -v "$scriptDir/app:/app" -w /app --network double-ii --rm node:20 node test/insert-example-data.js
