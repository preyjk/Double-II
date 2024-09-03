import request from 'supertest';
import express from 'express';
import router from '../routes/routes'; // Adjust the path as necessary
import AuthService from '../service/AuthService';

const app = express();
app.use(express.json());
app.use('/', router);
app.use((err, req, res, next) => {
  console.log(err);
  return res.status(500).json();
});

describe('Admin API End-to-End Tests', () => {
  let token;
  const username = 'abc';
  const password = 'abc';
  const role = 'abc';
  
  beforeAll(async () => {
    const res = await request(app)
      .post('/public/auth/login')
      .send({ username: 'admin', password: 'admin' })
      .expect('Content-Type', /json/)
      .expect(200);
    token = res.body.token;
  });

  test('should create a new user', async () => {
    const res = await request(app)
      .post('/admin/users')
      .set('Authorization', `Bearer ${token}`) 
      .send({username, password, roles: [role]})
      .expect(200);
  });

  test('new user should be able to login', async () => {
    const res = await request(app)
      .post('/public/auth/login')
      .send({username, password})
      .expect(200);
    
    expect(res.body).toHaveProperty('token');
    const token = res.body.token;
    expect(typeof token).toBe('string');
    const auth = AuthService.verifyToken(token);
    expect(auth.success).toBe(true);
    expect(auth.data.id).toBe(username);
    expect(auth.data.roles[0]).toBe(role)
  });

  test('should delete a user', async () => {
    const res = await request(app)
      .delete(`/admin/users/${username}`)
      .set('Authorization', `Bearer ${token}`) 
      .expect(204);
  });

});
