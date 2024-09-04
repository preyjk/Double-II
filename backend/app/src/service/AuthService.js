import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User, { UserIndex } from '../dal/User.js';
import EmailService from './EmailService.js';
import { dynamo, TransactionBuilder } from '../dal/DynamoDB.js';

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

  static generateToken(content, expiresIn = '1h') {
    return jwt.sign(content, JWT_SECRET, { expiresIn });
  }

  static verifyPassword(inputPassword, storedPassword) {
    const hashedInputPassword = AuthService.hashPassword(inputPassword);
    return hashedInputPassword === storedPassword;
  }

  static hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
  }

  static async sendVerificationEmail(emailAddress) {
    const token = AuthService.generateToken({ email: emailAddress }, '1d');
    return EmailService.sendVerificationEmail({ to: emailAddress, token });
  }

  static async verifyEmail(token) {
    const verificationResult = AuthService.verifyToken(token);
    if (!verificationResult.success) {
      return { success: false, message: 'Invalid token' };
    }
    const indexResult = await dynamo.send(UserIndex.findById(
      UserIndex.generateId({ Provider: 'email', ProviderId: verificationResult.data.email })
    ));
    if (!indexResult.Item) {
      return { success: false, message: 'User not found' };
    }
    const updateUserCommand = User.findByIdAndUpdate({
      Id: indexResult.Item.UserId,
      Version: indexResult.Item.Version,
      Active: true
    });
    await dynamo.send(updateUserCommand);
    return { success: true, message: 'Email verified' };
  }

  static async signup({ email, password, roles, active }) {
    try {
      const hashedPassword = AuthService.hashPassword(password);
      const createUserCommand = User.create({
        Password: hashedPassword,
        Providers: [{ Provider: 'email', ProviderId: email }],
        Roles: roles || [],
        Active: active || false
      });
      const createUserIndexCommand = UserIndex.create({
        Provider: 'email',
        ProviderId: email,
        UserId: createUserCommand.input.Item.Id
      });
      await new TransactionBuilder()
        .add(createUserIndexCommand)
        .add(createUserCommand)
        .execute();
      return { success: true, message: 'Signup successful' };
    } catch (error) {
      if (error.name === 'TransactionCanceledException'
        && error.CancellationReasons[0].Code === 'ConditionalCheckFailed') {
        return { success: false, message: 'User already exists' };
      } else {
        throw error;
      }
    }
  }

  static async login({ email, password }) {
    const indexResult = await dynamo.send(UserIndex.findById(
      UserIndex.generateId({ Provider: 'email', ProviderId: email })
    ));
    if (!indexResult.Item) {
      return { success: false, message: 'Unauthorized' };
    }
    const result = await dynamo.send(User.findById(indexResult.Item.UserId));
    if (result.Item) {
      if (!result.Item.Active) {
        return { success: false, message: 'Unverified Email Address' };
      }
      if (AuthService.verifyPassword(password, result.Item.Password)) {
        const token = AuthService.generateToken({ id: result.Item.Id, roles: result.Item.Roles });
        return { success: true, token };
      }
    }
    return { success: false, message: 'Unauthorized' };

  }
}

export default AuthService;
