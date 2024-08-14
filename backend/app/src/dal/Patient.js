import { dynamo } from './DynamoDB.js';
import { v4 as uuidv4 } from 'uuid';

const TABLE_NAME = process.env.PATIENTS_TABLE_NAME || 'Patients';

class Patient {
  static async list() {
    const params = {
      TableName: TABLE_NAME
    };
    return dynamo.scan(params);
  }

  static async create(data) {
    const item = {
      id: uuidv4(),
      ...data,
    };
    const params = {
      TableName: TABLE_NAME,
      Item: item
    };
    await dynamo.put(params);
    return item;
  }

  static async findById(patientId) {
    const params = {
      TableName: TABLE_NAME,
      Key: { id: patientId }
    };
    return dynamo.get(params);
  }

  static async findByIdAndUpdate(data) {
    const patientId = data.id;
    delete data.id;

    const params = {
      TableName: TABLE_NAME,
      Key: { id: patientId },
      UpdateExpression: '',
      ExpressionAttributeNames: {},
      ExpressionAttributeValues: {},
      ReturnValues: 'ALL_NEW',
      ConditionExpression: '#username = :username',
    };

    const updateExpressions = [];
    Object.keys(data).forEach((key, index) => {
      const attributeKey = `#attr${index}`;
      const valueKey = `:val${index}`;
      updateExpressions.push(`${attributeKey} = ${valueKey}`);
      params.ExpressionAttributeNames[attributeKey] = key;
      params.ExpressionAttributeValues[valueKey] = data[key];
    });

    params.UpdateExpression = 'set ' + updateExpressions.join(', ');

    params.ExpressionAttributeNames['#username'] = 'username';
    params.ExpressionAttributeValues[':username'] = data.username;

    return dynamo.update(params);
  }

  static async findByIdAndDelete(patientId) {
    const params = {
      TableName: TABLE_NAME,
      Key: { id: patientId }
    };
    return dynamo.delete(params);
  }

  static async findByUsername(username) {
    const params = {
      TableName: TABLE_NAME,
      IndexName: 'UsernameIndex', // Assumes there's a GSI on username
      KeyConditionExpression: '#username = :username',
      ExpressionAttributeNames: {
        '#username': 'username',
      },
      ExpressionAttributeValues: {
        ':username': username,
      }
    };
    return dynamo.query(params);
  }
}

export default Patient;
