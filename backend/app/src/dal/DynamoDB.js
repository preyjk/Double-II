import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';

console.log(`Env Var DYNAMODB_ENDPOINT is ${process.env.DYNAMODB_ENDPOINT}`);

export const dynamo = DynamoDBDocument.from(
    process.env.DYNAMODB_ENDPOINT ?
        new DynamoDB({ endpoint: process.env.DYNAMODB_ENDPOINT }) :
        new DynamoDB()
);
