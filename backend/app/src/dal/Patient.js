import DynamoTable from "./DynamoTable.js";
import { QueryCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
const TABLE_NAME = process.env.PATIENTS_TABLE_NAME || 'Patients';

class PatientTable extends DynamoTable {

  findByIdAndUpdate(record) {
    const {Id, UserId, ...data} = record;

    const params = {
      TableName: this.tableName,
      Key: { Id },
      UpdateExpression: '',
      ExpressionAttributeNames: {},
      ExpressionAttributeValues: {},
      ReturnValues: 'ALL_NEW',
      ConditionExpression: '#UserId = :UserId',
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

    params.ExpressionAttributeNames['#UserId'] = 'UserId';
    params.ExpressionAttributeValues[':UserId'] = UserId;
    
    return new UpdateCommand(params);
  }

  findByUserId(userId) {
    const params = {
      TableName: this.tableName,
      IndexName: 'UserIdIndex', // Assumes there's a GSI on username
      KeyConditionExpression: '#UserId = :UserId',
      ExpressionAttributeNames: {
        '#UserId': 'UserId',
      },
      ExpressionAttributeValues: {
        ':UserId': userId,
      }
    };
    return new QueryCommand(params);
  }
}

const Patient = new PatientTable(TABLE_NAME);

export default Patient;
