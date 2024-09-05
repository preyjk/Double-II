import DynamoTable from './DynamoTable.js';

const TABLE_NAME = process.env.USER_TABLE_NAME || 'Users';
const INDEX_NAME = process.env.USER_INDEX_TABLE_NAME || 'UserIndex';

class UserTable extends DynamoTable {

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

const User = new UserTable(TABLE_NAME);
export const UserIndex = new UserIndexTable(INDEX_NAME);

export default User;
