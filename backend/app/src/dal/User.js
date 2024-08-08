import { dynamo } from './DynamoDB.js';

console.log(`Env Var USER_TABLE_NAME is ${process.env.USER_TABLE_NAME}`);
const TABLE_NAME = process.env.USER_TABLE_NAME || 'Users';

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
