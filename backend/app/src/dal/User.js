import DynamoTable from './DynamoTable.js';
import { PutCommand } from '@aws-sdk/lib-dynamodb';

const TABLE_NAME = process.env.USER_TABLE_NAME || 'Users';

class UserTable extends DynamoTable {
  create(item) {
    const params = {
      TableName: this.tableName,
      Item: {...item, Version: 1},
      ConditionExpression: 'attribute_not_exists(Id)'
    };
    return new PutCommand(params);
  }

}

const User = new UserTable(TABLE_NAME);

export default User;
