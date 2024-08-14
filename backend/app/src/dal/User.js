import { dynamo } from './DynamoDB.js';

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

  static async findByUsernameAndDelete(username) {
    const params = {
      TableName: TABLE_NAME,
      Key: { username  }
    };
    return dynamo.delete(params);
  } 
}

export default User;
