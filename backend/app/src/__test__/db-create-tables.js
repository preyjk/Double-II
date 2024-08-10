import { DynamoDB } from "@aws-sdk/client-dynamodb";

export const dynamo = new DynamoDB({ endpoint: process.env.DYNAMODB_ENDPOINT });

// Define table parameters
const tableDefinitions = [
    {
        TableName: 'Appointments',
        KeySchema: [
            { AttributeName: 'id', KeyType: 'HASH' }, // Primary key
        ],
        AttributeDefinitions: [
            { AttributeName: 'id', AttributeType: 'S' },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
        },
    },
    {
        TableName: 'Users',
        KeySchema: [
            { AttributeName: 'username', KeyType: 'HASH' }, // Primary key
        ],
        AttributeDefinitions: [
            { AttributeName: 'username', AttributeType: 'S' },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
        },
    },
    {
        TableName: 'Doctors',
        KeySchema: [
            { AttributeName: 'id', KeyType: 'HASH' }, // Primary key
        ],
        AttributeDefinitions: [
            { AttributeName: 'id', AttributeType: 'S' },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
        },
    },
];

// Function to delete and recreate tables
export async function createTables() {
    try {
        for (const table of tableDefinitions) {
            // Step 1: Delete the table if it exists
            try {
                await dynamo.deleteTable({ TableName: table.TableName });
                console.log(`Table ${table.TableName} deleted successfully.`);
            } catch (error) {
                if (error.name === 'ResourceNotFoundException') {
                    console.log(`Table ${table.TableName} does not exist, skipping delete.`);
                } else {
                    throw error;
                }
            }

            // Step 2: Create the table
            await dynamo.createTable(table);
            console.log(`Table ${table.TableName} created successfully.`);
        }

        console.log('All tables have been initialized.');
    } catch (error) {
        console.error('Error initializing tables:', error);
    }
}
