import { DynamoDB, waitUntilTableExists, waitUntilTableNotExists } from "@aws-sdk/client-dynamodb";
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
    {
        TableName: 'Patients',
        KeySchema: [
            { AttributeName: 'id', KeyType: 'HASH' }, // Primary key
        ],
        AttributeDefinitions: [
            { AttributeName: 'id', AttributeType: 'S' },
            { AttributeName: 'username', AttributeType: 'S' },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
        },
        GlobalSecondaryIndexes: [
            {
                IndexName: 'UsernameIndex',
                KeySchema: [
                    { AttributeName: 'username', KeyType: 'HASH' }, // GSI key
                ],
                Projection: { ProjectionType: 'ALL' },
                ProvisionedThroughput: {
                    ReadCapacityUnits: 5,
                    WriteCapacityUnits: 5,
                },
            },
        ],
    },
    {
        TableName: 'WorkingSchedule',
        KeySchema: [
            { AttributeName: 'id', KeyType: 'HASH' }, // Primary key
        ],
        AttributeDefinitions: [
            { AttributeName: 'id', AttributeType: 'S' },
            { AttributeName: 'gpId', AttributeType: 'S' },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
        },
        GlobalSecondaryIndexes: [
            {
                IndexName: 'GpIdIndex',
                KeySchema: [
                    { AttributeName: 'gpId', KeyType: 'HASH' }, // GSI key
                ],
                Projection: { ProjectionType: 'ALL' },
                ProvisionedThroughput: {
                    ReadCapacityUnits: 5,
                    WriteCapacityUnits: 5,
                },
            },
        ]
    }
];

// Function to delete and recreate tables
export async function createTables() {
    try {
        for (const table of tableDefinitions) {
            // Step 1: Delete the table if it exists
            try {
                await dynamo.deleteTable({ TableName: table.TableName });
                const result = await waitUntilTableNotExists({ client: dynamo, maxWaitTime: 300 }, { TableName: table.TableName });
                console.log(`Deleting table ${table.TableName}...`, result.state);
            } catch (error) {
                if (error.name === 'ResourceNotFoundException') {
                    console.log(`Table ${table.TableName} does not exist, skipping delete.`);
                } else {
                    throw error;
                }
            }

            // Step 2: Create the table
            await dynamo.createTable(table);
            const result = await waitUntilTableExists({ client: dynamo, maxWaitTime: 300 }, { TableName: table.TableName });
            console.log(`Creating table ${table.TableName}...`, result.state);
        }

        console.log('All tables have been initialized.');
    } catch (error) {
        console.error('Error initializing tables:', error);
    }
}
