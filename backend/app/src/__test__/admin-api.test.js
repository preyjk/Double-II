import request from 'supertest';
import express from 'express';
import router from '../routes/routes'; // Adjust the path as necessary
import AuthService from '../service/AuthService';
import EmailService from '../service/EmailService';

const app = express();
app.use(express.json());
app.use('/', router);
app.use((err, req, res, next) => {
  console.log(err);
  return res.status(500).json();
});

describe('Admin API End-to-End Tests', () => {
  let token, userId;
  const email = 'abc';
  const password = 'abc';
  const role = 'abc';

  jest.mock('../service/EmailService'); 
  
  beforeAll(async () => {
    const res = await request(app)
      .post('/public/auth/login')
      .send({ email: 'admin', password: 'admin' })
      .expect('Content-Type', /json/)
      .expect(200);
    token = res.body.token;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create a new user', async () => {
    const res = await request(app)
      .post('/admin/users')
      .set('Authorization', `Bearer ${token}`) 
      .send({email, password, roles: [role]})
      .expect(200);
  });

  test('new user should be able to login', async () => {
    const res = await request(app)
      .post('/public/auth/login')
      .send({email, password})
      .expect(200);
    
    expect(res.body).toHaveProperty('token');
    const token = res.body.token;
    expect(typeof token).toBe('string');
    const auth = AuthService.verifyToken(token);
    expect(auth.success).toBe(true);
    expect(auth.data.roles[0]).toBe(role);
    userId = auth.data.id;
  });

  test('should list all users', async () => {
    const res = await request(app)
      .get('/admin/users')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);
    
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.find(user => user.Id === userId)).toBeTruthy();
  });

  test('should signup a doctor', async () => {
    const doctorRes = await request(app)
      .get('/public/doctors')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);
    const {Id: doctorId, Email: email}  = doctorRes.body[0];

    const sendInitialPasswordEmailSpy = jest.spyOn(EmailService, 'sendInitialPasswordEmail');
    await request(app)
      .post('/admin/users/doctor')
      .set('Authorization', `Bearer ${token}`) 
      .send({ doctorId })
      .expect(200);

    expect(sendInitialPasswordEmailSpy).toHaveBeenCalled();
    const [[{ password: interceptedPassword }]] = sendInitialPasswordEmailSpy.mock.calls;
    
    await request(app)
      .post('/public/auth/login')
      .send({ email, password: interceptedPassword })
      .expect(200);

    await request(app)
      .delete(`/admin/users/${doctorId}`)
      .set('Authorization', `Bearer ${token}`) 
      .expect(204);
  });

  test('should delete a user', async () => {
    const res = await request(app)
      .delete(`/admin/users/${userId}`)
      .set('Authorization', `Bearer ${token}`) 
      .expect(204);
  });

});
