import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../dal/User.mjs';

const JWT_SECRET = process.env.JWT_SECRET || 'JWT_SECRET';

class AuthService {
  static generateToken(username) {
    return jwt.sign({ username: username }, JWT_SECRET, { expiresIn: '1h' });
  }

  static verifyPassword(inputPassword, storedPassword) {
    const hashedInputPassword = crypto.createHash('sha256').update(inputPassword).digest('hex');
    return hashedInputPassword === storedPassword;
  }

  static async signup({ username, password }) {
    try {
      await User.create({ username, password });
      return { success: true, message: 'Signup successful' };
    } catch (error) {
      if (error.name === 'ConditionalCheckFailedException') {
        return { success: false, message: 'User already exists' };
      } else {
        throw error;
      }
    }
  }

  static async login({ username, password }) {
    try {
      const result = await User.findByUsername(username);
      if (result.Item && AuthService.verifyPassword(password, result.Item.password)) {
        const token = AuthService.generateToken(username);
        return { success: true, token };
      } else {
        return { success: false, message: 'Unauthorized' };
      }
    } catch (error) {
      throw error;
    }
  }
}

export default AuthService;
