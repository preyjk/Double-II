import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';

// Static configurations
const dynamo = DynamoDBDocument.from(
  process.env.ENV === 'local' ?
    new DynamoDB({ endpoint: process.env.DYNAMODB_ENDPOINT }) :
    new DynamoDB()
);
const TABLE_NAME = 'Doctors';

class Doctor {
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

  static async findById(doctorId) {
    const params = {
      TableName: TABLE_NAME,
      Key: { id: doctorId }
    };
    return dynamo.get(params);
  }

  static async findByIdAndUpdate(data) {
    const doctorId = data.id;
    delete data.id;

    const params = {
      TableName: TABLE_NAME,
      Key: { id: doctorId },
      UpdateExpression: '',
      ExpressionAttributeNames: {},
      ExpressionAttributeValues: {},
      ReturnValues: 'ALL_NEW'
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

    return dynamo.update(params);
  }

  static async findByIdAndDelete(doctorId) {
    const params = {
      TableName: TABLE_NAME,
      Key: { id: doctorId }
    };
    return dynamo.delete(params);
  }
}

export default Doctor;
