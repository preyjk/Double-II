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

describe('Doctor API End-to-End Tests', () => {
  let doctorId;
  const workplace = 'Hospital A';

  test('should list all doctors', async () => {
    const res = await request(app)
      .get('/doctors')
      .expect('Content-Type', /json/)
      .expect(200);
      
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('should create a new doctor', async () => {
    const newDoctor = {
      name: 'Dr. Smith',
      specialty: 'Cardiology',
      phone: '1234567890',
      email: 'dr.smith@example.com',
      address: workplace,
      WorkofPlace: workplace
    };

    const res = await request(app)
      .post('/doctors')
      .send(newDoctor)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(res.body).toHaveProperty('name', 'Dr. Smith');
    expect(res.body).toHaveProperty('specialty', 'Cardiology');
    expect(res.body).toHaveProperty('phone', '1234567890');
    expect(res.body).toHaveProperty('email', 'dr.smith@example.com');
    expect(res.body).toHaveProperty('WorkofPlace', workplace);
    expect(res.body).toHaveProperty('address', workplace);
    doctorId = res.body.id;  // Save the doctor ID for subsequent tests
  });

  test('should get a doctor by ID', async () => {
    const res = await request(app)
      .get(`/doctors/${doctorId}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toHaveProperty('id', doctorId);
  });

  test('should list doctors by workplace', async () => {
    const res = await request(app)
      .get(`/doctors?workplace=${workplace}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('WorkofPlace', workplace);
  });

  test('should update an existing doctor', async () => {
    const updatedData = {
      name: 'Dr. John Smith'
    };

    const res = await request(app)
      .put(`/doctors/${doctorId}`)
      .send(updatedData)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toHaveProperty('name', 'Dr. John Smith');
  });

  test('should list clinics', async () => {
    const res = await request(app)
      .get('/clinics')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    const found = res.body.find(item => item.workplace === workplace && item.address === workplace);
    expect(found).toBeDefined();
  });

  test('should delete a doctor', async () => {
    await request(app)
      .delete(`/doctors/${doctorId}`)
      .expect(204);
  });
});
