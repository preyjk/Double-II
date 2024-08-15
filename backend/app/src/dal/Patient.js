import DynamoTable from "./DynamoTable.js";
const TABLE_NAME = process.env.PATIENTS_TABLE_NAME || 'Patients';

class PatientTable extends DynamoTable {

  async findByIdAndUpdate(data) {
    const id = data.id;
    delete data.id;

    const params = {
      TableName: this.tableName,
      Key: { id },
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

    return this.dynamo.update(params);
  }

  async findByUsername(username) {
    const params = {
      TableName: this.tableName,
      IndexName: 'UsernameIndex', // Assumes there's a GSI on username
      KeyConditionExpression: '#username = :username',
      ExpressionAttributeNames: {
        '#username': 'username',
      },
      ExpressionAttributeValues: {
        ':username': username,
      }
    };
    return this.dynamo.query(params);
  }
}

const Patient = new PatientTable(TABLE_NAME);

export default Patient;
