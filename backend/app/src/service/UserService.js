import User from "../dal/User.js";

class UserService {
    static async deleteUser(id) {
        await User.findByIdAndDelete(id);
        return { success: true, message: 'User deleted successfully' };
    }
}

export default UserService;