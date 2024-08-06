import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import crypto from 'crypto';

const dynamo = DynamoDBDocument.from(
  process.env.ENV === 'local' ?
    new DynamoDB({ endpoint: process.env.DYNAMODB_ENDPOINT }) :
    new DynamoDB()
);

const TABLE_NAME = 'Users';

class User {
  static async create(item) {
    const params = {
      TableName: TABLE_NAME,
      Item: item,
      ConditionExpression: 'attribute_not_exists(username)'
    };
    return dynamo.put(params);
  }

  static async findByUsername(username) {
    const params = {
      TableName: TABLE_NAME,
      Key: { username }
    };
    return dynamo.get(params);
  }
}

export default User;
