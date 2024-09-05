import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, UpdateCommand, DeleteCommand, TransactWriteCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export const dynamo = DynamoDBDocumentClient.from(
    process.env.DYNAMODB_ENDPOINT ?
        new DynamoDBClient({ endpoint: process.env.DYNAMODB_ENDPOINT }) :
        new DynamoDBClient()
);

export class TransactionBuilder {
    constructor() {
        this.commands = []
    }

    convertToTransactWriteItem(command) {
        if (command instanceof PutCommand) {
            return { Put: { ...command.input } };
        } else if (command instanceof UpdateCommand) {
            return { Update: { ...command.input } };
        } else if (command instanceof DeleteCommand) {
            return { Delete: { ...command.input } };
        }
        throw new Error('Unsupported command type for TransactWriteItem');
    }

    add(command) {
        this.commands.push(this.convertToTransactWriteItem(command));
        return this;
    }

    async execute() {
        return dynamo.send(new TransactWriteCommand({
            TransactItems: this.commands
        }));
    }
}
