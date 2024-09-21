import DynamoTable from './DynamoTable.js';
import { GetCommand } from '@aws-sdk/lib-dynamodb';

const TABLE_NAME = process.env.USER_TABLE_NAME || 'Users';
const INDEX_NAME = process.env.USER_INDEX_TABLE_NAME || 'UserIndex';

class UserTable extends DynamoTable {
  getUserById(userId) {
    const params = {
      TableName: this.tableName,
      Key: {
        Id: userId,
      },
      ProjectionExpression: "FirstName, LastName, Providers", 
    };
    return new GetCommand(params);
  }
}

class UserIndexTable extends DynamoTable {
  generateId(data) {
    return `${data.Provider}_${data.ProviderId}`;
  }

  create(item) {
    const putCommand = super.create(item);
    putCommand.input.ConditionExpression = 'attribute_not_exists(Id)';
    return putCommand;
  }
}

export const User = new UserTable(TABLE_NAME);
export const UserIndex = new UserIndexTable(INDEX_NAME);

