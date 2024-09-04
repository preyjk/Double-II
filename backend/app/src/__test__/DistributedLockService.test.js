import DistributedLockService from "../service/DistributedLockService";

describe('Distributed Lock Service', () => {
    it('should acquire and release lock', async () => {
        const lock = await DistributedLockService.acquireLock('test-lock', 60);
        expect(lock).toBeDefined();

        await DistributedLockService.releaseLock(lock);
    });

    it('should not acquire lock if already acquired', async () => {
        const lock = await DistributedLockService.acquireLock('test-lock', 60);
        expect(lock).toBeDefined();

        const lock2 = await DistributedLockService.acquireLock('test-lock', 60);
        expect(lock2).toBeUndefined();

        await DistributedLockService.releaseLock(lock);
    });
});