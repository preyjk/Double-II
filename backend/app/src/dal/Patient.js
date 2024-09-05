import DynamoTable from "./DynamoTable.js";
import { QueryCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
const TABLE_NAME = process.env.PATIENTS_TABLE_NAME || 'Patients';

class PatientTable extends DynamoTable {

  findByIdAndUpdate(record) {
    const { UserId, ...data } = record;
    const updateCommand = super.findByIdAndUpdate(data);
    updateCommand.input.ConditionExpression += ' AND #UserId = :UserId'; 
    updateCommand.input.ExpressionAttributeNames['#UserId'] = 'UserId';
    updateCommand.input.ExpressionAttributeValues[':UserId'] = UserId;
    return updateCommand;
  }

  findByUserId(userId) {
    const params = {
      TableName: this.tableName,
      IndexName: 'UserIdIndex', 
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
