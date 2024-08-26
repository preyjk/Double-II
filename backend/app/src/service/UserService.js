import User from "../dal/User.js";
import { dynamo } from "../dal/DynamoDB.js";

class UserService {
    static async deleteUser(id) {
        await dynamo.send(User.findByIdAndDelete(id));
        return { success: true, message: 'User deleted successfully' };
    }
}

export default UserService;