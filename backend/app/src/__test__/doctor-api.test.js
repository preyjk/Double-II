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
  let version;
  let token;
  const Workplace = 'Hospital A';
  const Firstname = 'John';
  const Lastname = 'Smith';

  beforeAll(async () => {
    const res = await request(app)
      .post('/public/auth/login')
      .send({ email: 'admin', password: 'admin' })
      .expect('Content-Type', /json/)
      .expect(200);
    token = res.body.token;
  });

  test('should list all doctors', async () => {
    const res = await request(app)
      .get('/admin/doctors')
      .set('Authorization', `Bearer ${token}`)
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
      .post('/admin/doctors')
      .set('Authorization', `Bearer ${token}`)
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
    version = res.body.Version;
  });

  test('should get a doctor by ID', async () => {
    const res = await request(app)
      .get(`/admin/doctors/${doctorId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toHaveProperty('Id', doctorId);
    expect(res.body).toHaveProperty('Version', version);
  });

  test('should list doctors by workplace', async () => {
    const res = await request(app)
      .get(`/admin/doctors?workplace=${Workplace}`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('Workplace', Workplace);
  });

  // New test case for listing doctors by firstname and lastname
  test('should list doctors by firstname and lastname', async () => {
    const res = await request(app)
      .get(`/admin/doctors?firstname=${Firstname}&lastname=${Lastname}`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('FirstName', Firstname);
    expect(res.body[0]).toHaveProperty('LastName', Lastname);
  });

  test('should update an existing doctor', async () => {
    const updatedData = {
      Firstname: 'John',
      Lastname: 'Smith Jr.',
      Version: version
    };

    const res = await request(app)
      .put(`/admin/doctors/${doctorId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedData)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toHaveProperty('Lastname', 'Smith Jr.');
    version = res.body.Version;
  });

  test('should list clinics', async () => {
    const res = await request(app)
      .get('/public/clinics')
      .expect('Content-Type', /json/)
      .expect(200);
      
    expect(Array.isArray(res.body)).toBe(true);
    const found = res.body.find(item => item.workplace === Workplace && item.address === Workplace);
    expect(found).toBeDefined();
    expect(res.body.length).toBe(9);
  });

  test('should delete a doctor', async () => {
    await request(app)
      .delete(`/admin/doctors/${doctorId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);
  });
});
