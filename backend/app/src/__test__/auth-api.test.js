import request from 'supertest';
import express from 'express';
import router from '../routes/routes';
import AuthService from '../service/AuthService.js';
import UserService from '../service/UserService.js';

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
    let userId;

    it('should sign up a new user', async () => {
      const response = await request(app)
        .post('/public/auth/signup')
        .send({ email, password })
        .expect(200);
      
      expect(response.text).toBe('"Signup successful"');
    });

    it('should not sign up an existing user', async () => {
      const response = await request(app)
        .post('/public/auth/signup')
        .send({ email, password })
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
      const token = AuthService.generateToken({ email }, '1d');
      const response = await request(app)
        .post(`/public/auth/verify-email`)
        .send({ token })
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
    });

    it('should not log in with incorrect password', async () => {
      const response = await request(app)
        .post('/public/auth/login')
        .send({ email, password: 'wrongpassword' })
        .expect(401);
      
      expect(response.text).toBe('"Unauthorized"');
    });

    afterAll(async () => {
      await UserService.deleteUser(userId);
    });
});
