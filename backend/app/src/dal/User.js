import DynamoTable from './DynamoTable.js';

const TABLE_NAME = process.env.USER_TABLE_NAME || 'Users';

class UserTable extends DynamoTable {
  async create(item) {
    const params = {
      TableName: this.tableName,
      Item: item,
      ConditionExpression: 'attribute_not_exists(Id)'
    };
    return this.dynamo.put(params);
  }

}

const User = new UserTable(TABLE_NAME);

export default User;
