import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../dal/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'JWT_SECRET';

class AuthService {
  
  static verifyToken(token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return { success: true, data: decoded };
    } catch (error) {
      return { success: false, message: 'Invalid token' };
    }
  }

  static verifyRequest(req, res, next) {
    try {
      const authHeader = req.headers['authorization'];
      if (!authHeader) {
        return res.status(401).json({ success: false, message: 'No authorization header' });
      }

      const token = authHeader.split(' ')[1];
      if (!token) {
        return res.status(401).json({ success: false, message: 'Token missing from authorization header' });
      }

      const verificationResult = AuthService.verifyToken(token);
      if (!verificationResult.success) {
        return res.status(401).json(verificationResult);
      }

      // Attach username to the request object for further use in your routes
      req.auth = verificationResult.data;
      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Error processing request' });
    }
  }

  static hasRole(roles) {
    return (req, res, next) => {
      if (!req.auth.roles?.some(r => roles.includes(r))) {
        return res.status(401).json();
      }
      next()
    }
  }

  static generateToken(authContent) {
    return jwt.sign(authContent, JWT_SECRET, { expiresIn: '1h' });
  }

  static verifyPassword(inputPassword, storedPassword) {
    const hashedInputPassword = AuthService.hashPassword(inputPassword);
    return hashedInputPassword === storedPassword;
  }

  static hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
  }

  static async signup({ username, password, roles }) {
    try {
      const hashedPassword = AuthService.hashPassword(password);
      await User.create({ Id: username, Password: hashedPassword, Roles: roles});
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
      const result = await User.findById(username);
      if (result.Item && AuthService.verifyPassword(password, result.Item.Password)) {
        const token = AuthService.generateToken({id: username, roles: result.Item.Roles});
        return { success: true, token };
      } 
      return { success: false, message: 'Unauthorized' };
    } catch (error) {
      throw error;
    }
  }
}

export default AuthService;
