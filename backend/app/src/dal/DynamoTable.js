import { ScanCommand, PutCommand, GetCommand, UpdateCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from 'uuid';

class DynamoTable {
    constructor(tableName) {
        this.tableName = tableName;
    }

    /**
     * List all items in the DynamoDB table.
     * @returns {ScanCommand} The command to list all items in the table.
     */
    list() {
        const params = {
            TableName: this.tableName,
        };
        return new ScanCommand(params);
    }

    /**
     * Create a new item in the DynamoDB table.
     * @param {Object} data - The data to insert into the table.
     * @returns {PutCommand} The command to create a new item.
     */
    create(data) {
        const item = {
            Id: this.generateId(data),
            ...data,
        };
        const params = {
            TableName: this.tableName,
            Item: item,
            ReturnValues: 'ALL_OLD'
        };
        return new PutCommand(params);
    }

    /**
     * Find an item by its ID in the DynamoDB table.
     * @param {string} Id - The ID of the item to find.
     * @returns {GetCommand} The command to get an item by its ID.
     */
    findById(Id) {
        const params = {
            TableName: this.tableName,
            Key: { Id },
        };
        return new GetCommand(params);
    }

    /**
     * Update an item by its ID in the DynamoDB table.
     * @param {Object} newData - The new data for the item, including its ID.
     * @returns {UpdateCommand} The command to update an item by its ID.
     */
    findByIdAndUpdate(newData) {
        const { Id, ...data } = newData;

        const params = {
            TableName: this.tableName,
            Key: { Id },
            UpdateExpression: '',
            ExpressionAttributeNames: {},
            ExpressionAttributeValues: {},
            ReturnValues: 'ALL_NEW',
        };

        const updateExpressions = [];
        Object.keys(data).forEach(key => {
            const attributeKey = `#${key}`;
            const valueKey = `:${key}`;
            updateExpressions.push(`${attributeKey} = ${valueKey}`);
            params.ExpressionAttributeNames[attributeKey] = key;
            params.ExpressionAttributeValues[valueKey] = data[key];
        });

        params.UpdateExpression = 'set ' + updateExpressions.join(', ');

        return new UpdateCommand(params);
    }

    /**
     * Delete an item by its ID from the DynamoDB table.
     * @param {string} Id - The ID of the item to delete.
     * @returns {DeleteCommand} The command to delete an item by its ID.
     */
    findByIdAndDelete(Id) {
        const params = {
            TableName: this.tableName,
            Key: { Id },
        };
        return new DeleteCommand(params);
    }

    /**
     * Find items by a specific property and value in the DynamoDB table.
     * @param {string} propertyName - The name of the property to filter by.
     * @param {any} value - The value to filter by.
     * @returns {ScanCommand} The command to find items by property.
     */
    findByProperty(propertyName, value) {
        const params = {
            TableName: this.tableName,
            FilterExpression: `#key = :value`,
            ExpressionAttributeNames: {
                '#key': propertyName,
            },
            ExpressionAttributeValues: {
                ':value': value,
            },
        };
        return new ScanCommand(params);
    }

    /**
     * Generate a unique ID for a new item.
     * @param {Object} data - The data for which to generate an ID.
     * @returns {string} A unique ID.
     */
    generateId(data) {
        return uuidv4();
    }
}

export default DynamoTable;
