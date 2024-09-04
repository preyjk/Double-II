import DistributedLock from "../dal/DistributedLock.js";
import { dynamo } from "../dal/DynamoDB.js";
import { v4 as uuidv4 } from 'uuid';

class DistributedLockService {
    static async acquireLock(lockName, ttl) {
        const lock = await dynamo.send(DistributedLock.findById(lockName));
        if (lock.Item && lock.Item.ExpiredAt > Math.floor(Date.now() / 1000)) {
            return;
        }
        const createCommand = DistributedLock.create({
            Id: lockName,
            LockId: uuidv4(),
            ExpiredAt: Math.floor(Date.now() / 1000) + ttl,
        });
        await dynamo.send(createCommand);
        return {
            Id: lockName,
            LockId: createCommand.input.Item.LockId,
        }
    }

    static async releaseLock(lock) {
        const deleteCommand = DistributedLock.findLockAndDelete(lock);
        await dynamo.send(deleteCommand);
    }
}

export default DistributedLockService;