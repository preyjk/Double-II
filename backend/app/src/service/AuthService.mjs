import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../dal/User.mjs';

const JWT_SECRET = process.env.JWT_SECRET || 'JWT_SECRET';

class AuthService {
  static generateToken(username) {
    return jwt.sign({ username: username }, JWT_SECRET, { expiresIn: '1h' });
  }

  static verifyPassword(inputPassword, storedPassword) {
    const hashedInputPassword = this.hashPassword(inputPassword);
    return hashedInputPassword === storedPassword;
  }

  static hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
  }

  static async signup({ username, password }) {
    try {
      const hashedPassword = this.hashPassword(password);
      await User.create({ username, password: hashedPassword });
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
      if (result.Item && this.verifyPassword(password, result.Item.password)) {
        const token = this.generateToken(username);
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
