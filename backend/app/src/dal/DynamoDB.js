import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';

export const dynamo = DynamoDBDocument.from(
    process.env.DYNAMODB_ENDPOINT ?
        new DynamoDB({ endpoint: process.env.DYNAMODB_ENDPOINT }) :
        new DynamoDB()
);
