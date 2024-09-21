import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User, { UserIndex } from '../dal/User.js';
import Doctor from '../dal/Doctor.js';
import EmailService from './EmailService.js';
import { dynamo, TransactionBuilder } from '../dal/DynamoDB.js';

const JWT_SECRET = process.env.JWT_SECRET || 'JWT_SECRET';

const ACTION_VERIFY_EMAIL = 'verify email';
const ACTION_RESET_PASSWORD = 'reset password';

class AuthService {

  static generateRandomPassword(length = 8) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
    return password;
  }

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
    const token = AuthService.generateToken({ action: ACTION_VERIFY_EMAIL, email: emailAddress }, '1d');
    return EmailService.sendVerificationEmail({ to: emailAddress, token });
  }

  static async verifyEmail(token) {
    const verificationResult = AuthService.verifyToken(token);
    if (!verificationResult.success || verificationResult.data.action !== ACTION_VERIFY_EMAIL) {
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

  static async signupDoctor(doctorId) {
    const getDoctorResult = await dynamo.send(Doctor.findById(doctorId));
    if (!getDoctorResult.Item) {
      return { success: false, message: 'Doctor not found' };
    }
    const doctor = getDoctorResult.Item;
    const password = AuthService.generateRandomPassword();
    await AuthService.signup({
      id: doctorId,
      email: doctor.Email,
      password,
      roles: ['doctor'],
      active: true,
      firstName: doctor.FirstName,
      lastName: doctor.LastName
    });
    await EmailService.sendInitialPasswordEmail({ to: doctor.Email, password });
    return { success: true, message: 'User created' };
  }

  static async signup({ id, email, password, roles, active, firstName, lastName }) {
    try {
      const hashedPassword = AuthService.hashPassword(password);
      const createUserCommand = User.create({
        FirstName: firstName,
        LastName: lastName,
        Password: hashedPassword,
        Providers: [{ Provider: 'email', ProviderId: email }],
        Roles: roles || [],
        Active: active || false
      });
      id && (createUserCommand.input.Item.Id = id);
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
        const token = AuthService.generateAccessToken({ id: result.Item.Id, roles: result.Item.Roles });
        const refreshToken = AuthService.generateRefreshToken({ id: result.Item.Id });
        return { success: true, token, refreshToken };
      }
    }
    return { success: false, message: 'Unauthorized' };

  }

  static async changePassword({ email, oldPassword, newPassword }) {
    const indexResult = await dynamo.send(UserIndex.findById(
      UserIndex.generateId({ Provider: 'email', ProviderId: email })
    ));
    if (!indexResult.Item) {
      return { success: false, message: 'Unauthorized' };
    }
    const result = await dynamo.send(User.findById(indexResult.Item.UserId));
    if (result.Item && AuthService.verifyPassword(oldPassword, result.Item.Password)) {
      const updateCommand = User.findByIdAndUpdate({
        Id: result.Item.Id,
        Version: result.Item.Version,
        Password: AuthService.hashPassword(newPassword)
      });
      await dynamo.send(updateCommand);
      return { success: true, message: 'Password updated' };
    }
    return { success: false, message: 'Unauthorized' };
  }

  static async resetPassword({ token, newPassword }) {
    const verificationResult = AuthService.verifyToken(token);
    if (!verificationResult.success || verificationResult.data.action !== ACTION_RESET_PASSWORD) {
      return { success: false, message: 'Invalid token' };
    }
    const { email, version } = verificationResult.data;
    const indexResult = await dynamo.send(UserIndex.findById(
      UserIndex.generateId({ Provider: 'email', ProviderId: email })
    ));
    if (!indexResult.Item) {
      return { success: false, message: 'Unauthorized' };
    }
    const updateCommand = User.findByIdAndUpdate({
      Id: indexResult.Item.UserId,
      Version: version,
      Password: AuthService.hashPassword(newPassword)
    });
    await dynamo.send(updateCommand);
    return { success: true, message: 'Password updated' };
  }

  static async sendResetPasswordEmail(emailAddress) {
    const indexResult = await dynamo.send(UserIndex.findById(
      UserIndex.generateId({ Provider: 'email', ProviderId: emailAddress })
    ));
    if (!indexResult.Item) {
      return { success: true };
    }
    const user = await dynamo.send(User.findById(indexResult.Item.UserId));
    if (!user.Item) {
      return { success: true };
    }
    const token = AuthService.generateToken({
      action: ACTION_RESET_PASSWORD,
      version: user.Item.Version,
      email: emailAddress
    }, '1d');
    return EmailService.sendResetPasswordEmail({ to: emailAddress, token });
  }

  static generateAccessToken(content) {
    return AuthService.generateToken({ ...content, type: 'access_token' }, '1h');
  }

  static generateRefreshToken(content) {
    return AuthService.generateToken({ ...content, type: 'refresh_token' }, '7d');
  }

  static async refreshAccessToken(refreshToken) {
    const verificationResult = AuthService.verifyToken(refreshToken);
    if (!verificationResult.success || verificationResult.data.type !== 'refresh_token') {
      return { success: false, message: 'Invalid token' };
    }
    const user = await dynamo.send(User.findById(verificationResult.data.id));
    if (!user.Item) {
      return { success: false, message: 'User not found' };
    }
    const token = AuthService.generateAccessToken({ id: user.Item.Id, roles: user.Item.Roles });
    return { success: true, token };
  }

  static getGoogleAuthUrl() {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&response_type=code&scope=openid%20email%20profile`;
    return googleAuthUrl;
  }

  static async googleLogin(code) {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&grant_type=authorization_code`
    });
    const data = await response.json();
    const googleUser = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${data.access_token}`);
    if (!googleUser.ok) {
      return { success: false, message: 'Google login failed' };
    }
    const userData = await googleUser.json();
    const openid = userData.id;
    const givenName = userData.given_name;
    const familyName = userData.family_name;
    const indexResult = await dynamo.send(UserIndex.findById(
      UserIndex.generateId({ Provider: 'google', ProviderId: openid })
    ));
    let index = indexResult.Item;
    if (!index) {
      index = await AuthService.signupWithGoogle({ openid, givenName, familyName });
    }
    const token = AuthService.generateAccessToken({ id: index.UserId });
    const refreshToken = AuthService.generateRefreshToken({ id: index.UserId });
    return { success: true, token, refreshToken }; 
  }

  static async signupWithGoogle({ openid, givenName, familyName }) {
    const createUserCommand = User.create({
      FirstName: givenName,
      LastName: familyName,
      Providers: [{ Provider: 'google', ProviderId: openid }],
      Roles: ['user'],
      Active: true
    });
    const createUserIndexCommand = UserIndex.create({
      Provider: 'google',
      ProviderId: openid,
      UserId: createUserCommand.input.Item.Id
    });
    await new TransactionBuilder()
      .add(createUserIndexCommand)
      .add(createUserCommand)
      .execute();
    return createUserCommand.input.Item;
  }
}

export default AuthService;
