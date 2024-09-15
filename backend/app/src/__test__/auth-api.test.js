import request from 'supertest';
import express from 'express';
import router from '../routes/routes';
import AuthService from '../service/AuthService.js';
import UserService from '../service/UserService.js';
import EmailService from '../service/EmailService.js';
import e from 'express';

const app = express();
app.use(express.json());
app.use('/', router);
app.use((err, req, res, next) => {
  console.log(err);
  return res.status(500).json();
});

describe('User Authentication API', () => {
  let email = `testuser_${Math.floor(Math.random() * 10000)}`;
  let password = 'testpassword';
  const firstName = 'Test';
  const lastName = 'User';
  let newPassword = 'newpassword';
  let resetPassword = 'resetedpassword';
  let userId;
  let emailVerificationToken;
  let refreshToken;

  jest.mock('../service/EmailService');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should sign up a new user', async () => {
    const sendVerificationEmailSpy = jest.spyOn(EmailService, 'sendVerificationEmail');
    const response = await request(app)
      .post('/public/auth/signup')
      .send({ email, password, firstName, lastName })
      .expect(200);

    expect(response.text).toBe('"Signup successful"');
    expect(sendVerificationEmailSpy).toHaveBeenCalled();
    emailVerificationToken = sendVerificationEmailSpy.mock.calls[0][0].token;

    const userList = (await UserService.listUsers()).data;
    const user = userList.find((user) => user.Providers[0].ProviderId === email);
    expect(user).not.toBeUndefined();
    expect(user).toHaveProperty('FirstName', firstName);
    expect(user).toHaveProperty('LastName', lastName);
  });

  it('should not sign up an existing user', async () => {
    const response = await request(app)
      .post('/public/auth/signup')
      .send({ email, password, firstName, lastName })
      .expect(400);

    expect(response.text).toBe('"User already exists"');
  });

  it('should not login with unverified email', async () => {
    const response = await request(app)
      .post('/public/auth/login')
      .send({ email, password })
      .expect(401);

    expect(response.text).toBe('"Unverified Email Address"');
  });

  it('should verify email', async () => {
    const response = await request(app)
      .post(`/public/auth/verify-email`)
      .send({ token: emailVerificationToken })
      .expect(200);

    expect(response.text).toBe('"Email verified"');
  });

  it('should log in an existing user', async () => {
    const response = await request(app)
      .post('/public/auth/login')
      .send({ email, password })
      .expect(200);

    expect(response.body).toHaveProperty('token');
    const token = response.body.token;
    expect(typeof token).toBe('string');
    userId = AuthService.verifyToken(token).data.id;

    refreshToken = response.body.refreshToken;
  });

  it('should refresh token', async () => {
    const response = await request(app)
      .post('/public/auth/refresh-token')
      .send({ refreshToken })
      .expect(200);
    expect(response.body).toHaveProperty('token');
    expect(AuthService.verifyToken(response.body.token).data.id).toBe(userId);
  });

  it('should not log in with incorrect password', async () => {
    const response = await request(app)
      .post('/public/auth/login')
      .send({ email, password: 'wrongpassword' })
      .expect(401);

    expect(response.text).toBe('"Unauthorized"');
  });

  it('should change password', async () => {
    const response = await request(app)
      .post('/public/auth/change-password')
      .send({ email, oldPassword: password, newPassword })
      .expect(200);

    expect(response.text).toBe('"Password updated"');
  });

  it('should not change password with incorrect old password', async () => {
    await request(app)
      .post('/public/auth/change-password')
      .send({ email, oldPassword: password, newPassword })
      .expect(401);
  });

  it('should login with new password', async () => {
    const response = await request(app)
      .post('/public/auth/login')
      .send({ email, password: newPassword })
      .expect(200);

    expect(response.body).toHaveProperty('token');
  });

  let resetPasswordToken;
  it('should send reset password email', async () => {
    const sendResetPasswordEmailSpy = jest.spyOn(EmailService, 'sendResetPasswordEmail');
    await request(app)
      .post('/public/auth/forgot-password')
      .send({ email })
      .expect(200);
    expect(sendResetPasswordEmailSpy).toHaveBeenCalled();
    resetPasswordToken = sendResetPasswordEmailSpy.mock.calls[0][0].token;
  });

  it('should reset password', async () => {
    await request(app)
      .post('/public/auth/reset-password')
      .send({ token: resetPasswordToken, newPassword: resetPassword })
      .expect(200);
  });

  it('should not reset password again with same token', async () => {
    await request(app)
      .post('/public/auth/reset-password')
      .send({ token: resetPasswordToken, newPassword: '123' })
      .expect(500);
  });

  it('should login with reset password', async () => {
    const response = await request(app)
      .post('/public/auth/login')
      .send({ email, password: resetPassword })
      .expect(200);

    expect(response.body).toHaveProperty('token');
  });

  afterAll(async () => {
    await UserService.deleteUser(userId);
  });
});
