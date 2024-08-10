import request from 'supertest';
import express from 'express';
import router from '../routes/routes';
import { createTables } from './db-create-tables.js';

const app = express();
app.use(express.json());
app.use('/', router);

beforeAll(async () => {
  await createTables();
});

describe('User Authentication API', () => {

    let username = `testuser_${Math.floor(Math.random() * 10000)}`;
    let password = 'testpassword';

    it('should sign up a new user', async () => {
      const response = await request(app)
        .post('/signup')
        .send({ username, password })
        .expect(200);
      
      expect(response.text).toBe('"Signup successful"');
    });

    it('should not sign up an existing user', async () => {
      const response = await request(app)
        .post('/signup')
        .send({ username, password })
        .expect(400);
      
      expect(response.text).toBe('"User already exists"');
    });

    it('should log in an existing user', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username, password })
        .expect(200);
      
      expect(response.body).toHaveProperty('token');
      const token = response.body.token;
      expect(typeof token).toBe('string');
    });

    it('should not log in with incorrect password', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username, password: 'wrongpassword' })
        .expect(401);
      
      expect(response.text).toBe('"Unauthorized"');
    });
});
