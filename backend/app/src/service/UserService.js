import {User, UserIndex } from '../dal/User.js';
import { dynamo, TransactionBuilder } from "../dal/DynamoDB.js";

class UserService {
    static async deleteUser(id) {
        const result = await dynamo.send(User.findById(id));
        if (!result.Item) {
            return { success: false, message: 'User not found' };
        }
        const txBuilder = new TransactionBuilder();
        txBuilder.add(User.findByIdAndDelete(id));
        result.Item.Providers.forEach(provider => {
            txBuilder.add(UserIndex.findByIdAndDelete(UserIndex.generateId(provider)));
        });
        await txBuilder.execute();
        return { success: true, message: 'User deleted successfully' };
    }

    static async listUsers() {
        const result = await dynamo.send(User.list());
        return { success: true, data: result.Items };
    }

    static async getUserById(id) {
        const result = await dynamo.send(User.findById(id));
        if (result.Item) {
            return { success: true, data: result.Item };
        } else {
            return { success: false, message: 'User not found' };
        }
    }
}

export default UserService;