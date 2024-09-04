import DynamoTable from "./DynamoTable.js";

const TABLE_NAME = process.env.DISTRIBUTED_LOCK_TABLE_NAME || 'DistributedLocks';

class DistributedLockTable extends DynamoTable {
    create(data) {
        const createCommand = super.create(data);
        createCommand.ConditionExpression = '#ExpiredAt < :now';
        createCommand.ExpressionAttributeNames = {
            '#ExpiredAt': 'ExpiredAt',
        };
        createCommand.ExpressionAttributeValues = {
            ':now': Math.floor(Date.now() / 1000),
        };
        return createCommand;
    }
    
    findLockAndDelete(lock) {
        const deleteCommand = super.findByIdAndDelete(lock.Id);
        deleteCommand.ConditionExpression = '#LockId = :lockId';
        deleteCommand.ExpressionAttributeNames = {
            '#LockId': 'LockId',
        };
        deleteCommand.ExpressionAttributeValues = {
            ':lockId': lock.LockId,
        };
        return deleteCommand;
    }
}

const DistributedLock = new DistributedLockTable(TABLE_NAME);
export default DistributedLock;