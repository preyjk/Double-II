import request from 'supertest';
import express from 'express';
import router from '../routes/routes';

const app = express();
app.use(express.json());
app.use('/', router);
app.use((err, req, res, next) => {
  console.log(err);
  return res.status(500).json();
});

describe('Doctor API End-to-End Tests', () => {
  let doctorId;
  const Workplace = 'Hospital A';
  const Firstname = 'John';
  const Lastname = 'Smith';

  test('should list all doctors', async () => {
    const res = await request(app)
      .get('/doctors')
      .expect('Content-Type', /json/)
      .expect(200);
      
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('should create a new doctor', async () => {
    const newDoctor = {
      FirstName: 'John',
      LastName: 'Smith',
      Specialty: 'Cardiology',
      Phone: '1234567890',
      Email: 'dr.smith@example.com',
      Address: Workplace,
      Workplace: Workplace
    };

    const res = await request(app)
      .post('/doctors')
      .send(newDoctor)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(res.body).toHaveProperty('FirstName', 'John');
    expect(res.body).toHaveProperty('LastName', 'Smith');
    expect(res.body).toHaveProperty('Specialty', 'Cardiology');
    expect(res.body).toHaveProperty('Phone', '1234567890');
    expect(res.body).toHaveProperty('Email', 'dr.smith@example.com');
    expect(res.body).toHaveProperty('Workplace', Workplace);
    expect(res.body).toHaveProperty('Address', Workplace);
    doctorId = res.body.Id;  // Save the doctor ID for subsequent tests
  });

  test('should get a doctor by ID', async () => {
    const res = await request(app)
      .get(`/doctors/${doctorId}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toHaveProperty('Id', doctorId);
  });

  test('should list doctors by workplace', async () => {
    const res = await request(app)
      .get(`/doctors?workplace=${Workplace}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('Workplace', Workplace);
  });

  // New test case for listing doctors by firstname and lastname
  test('should list doctors by firstname and lastname', async () => {
    const res = await request(app)
      .get(`/doctors?firstname=${Firstname}&lastname=${Lastname}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('FirstName', Firstname);
    expect(res.body[0]).toHaveProperty('LastName', Lastname);
  });

  test('should update an existing doctor', async () => {
    const updatedData = {
      Firstname: 'John',
      Lastname: 'Smith Jr.'
    };

    const res = await request(app)
      .put(`/doctors/${doctorId}`)
      .send(updatedData)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toHaveProperty('Lastname', 'Smith Jr.');
  });

  test('should list clinics', async () => {
    const res = await request(app)
      .get('/clinics')
      .expect('Content-Type', /json/)
      .expect(200);
      
    expect(Array.isArray(res.body)).toBe(true);
    const found = res.body.find(item => item.workplace === Workplace && item.address === Workplace);
    expect(found).toBeDefined();
    expect(res.body.length).toBe(9);
  });

  test('should delete a doctor', async () => {
    await request(app)
      .delete(`/doctors/${doctorId}`)
      .expect(204);
  });
});
