import User from "../dal/User.js";

class UserService {
    static async deleteUser(username) {
        await User.findByUsernameAndDelete(username);
        return { success: true, message: 'User deleted successfully' };
    }
}

export default UserService;