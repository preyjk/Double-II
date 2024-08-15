import { dynamo } from './DynamoDB.js';
import { v4 as uuidv4 } from 'uuid';

class DynamoTable {
    constructor(tableName) {
        this.tableName = tableName;
        this.dynamo = dynamo;
    }

    async list() {
        const params = {
            TableName: this.tableName
        };
        return dynamo.scan(params);
    }

    async create(data) {
        const item = {
            id: this.generateId(data),
            ...data,
        };
        const params = {
            TableName: this.tableName,
            Item: item
        };
        await dynamo.put(params);
        return item;
    }

    async findById(id) {
        const params = {
            TableName: this.tableName,
            Key: { id }
        };
        return dynamo.get(params);
    }

    async findByIdAndUpdate(data) {
        const id = data.id;
        delete data.id;

        const params = {
            TableName: this.tableName,
            Key: { id },
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

    async findByIdAndDelete(id) {
        const params = {
            TableName: this.tableName,
            Key: { id: id }
        };
        return dynamo.delete(params);
    }

    async findByProperty(propertyName, value) {
        const params = {
            TableName: this.tableName,
            FilterExpression: `#key = :value`,
            ExpressionAttributeNames: {
                '#key': propertyName
            },
            ExpressionAttributeValues: {
                ':value': value
            }
        };
        return dynamo.scan(params);
    }

    generateId(data) {
        return uuidv4();
    }
}

export default DynamoTable;