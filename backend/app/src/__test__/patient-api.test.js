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

describe('Patient API End-to-End Tests', () => {
  let patientId;
  let version;
  let token;
  const invalidToken = 'invalid token';
  const mismatchedUsername = 'mismatcheduser';
  const mismatchedToken = AuthService.generateToken({ id: mismatchedUsername });

  beforeAll(async () => {
    const res = await request(app)
      .post('/public/auth/login')
      .send({ email: 'test', password: 'test' })
      .expect('Content-Type', /json/)
      .expect(200);
    token = res.body.token;
  });

  test('should list all patients', async () => {
    const res = await request(app)
      .get('/user/patients')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  test('should create a new patient', async () => {
    const newPatient = {
      Name: 'John Doe',
      Age: 30,
      Gender: 'Male',
      Phone: '1234567890',
      Email: 'john.doe@example.com',
      Address: '123 Main St',
    };

    const res = await request(app)
      .post('/user/patients')
      .set('Authorization', `Bearer ${token}`) // Assuming authorization token or email is passed this way
      .send(newPatient)
      .expect('Content-Type', /json/)
      .expect(201);

    const { id } = AuthService.verifyToken(token).data;

    expect(res.body).toHaveProperty('Name', 'John Doe');
    expect(res.body).toHaveProperty('Age', 30);
    expect(res.body).toHaveProperty('Gender', 'Male');
    expect(res.body).toHaveProperty('Phone', '1234567890');
    expect(res.body).toHaveProperty('Email', 'john.doe@example.com');
    expect(res.body).toHaveProperty('Address', '123 Main St');
    expect(res.body).toHaveProperty('UserId', id);
    patientId = res.body.Id;  // Save the patient ID for subsequent tests
    version = res.body.Version;
  });

  test('should fail to get a patient by ID with a mismatched email token', async () => {
    await request(app)
      .get(`/user/patients/${patientId}`)
      .set('Authorization', `Bearer ${mismatchedToken}`)
      .expect(404); // Not Found
  });

  test('should fail to update a patient with a mismatched email token', async () => {
    const updatedData = {
      name: 'Jane Doe Updated',
      Version: version,
    };

    await request(app)
      .put(`/user/patients/${patientId}`)
      .set('Authorization', `Bearer ${mismatchedToken}`)
      .send(updatedData)
      .expect(404); // Not Found
  });

  test('should fail to delete a patient with a mismatched email token', async () => {
    await request(app)
      .delete(`/user/patients/${patientId}`)
      .set('Authorization', `Bearer ${mismatchedToken}`)
      .expect(404); // Not Found
  });

  test('should get a patient by ID', async () => {
    const res = await request(app)
      .get(`/user/patients/${patientId}`)
      .set('Authorization', `Bearer ${token}`) // Assuming authorization token or email is passed this way
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toHaveProperty('Id', patientId);
  });

  test('should update an existing patient', async () => {
    const updatedData = {
      name: 'Johnathan Doe',
      Version: version,
    };

    const res = await request(app)
      .put(`/user/patients/${patientId}`)
      .set('Authorization', `Bearer ${token}`) // Assuming authorization token or email is passed this way
      .send(updatedData)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toHaveProperty('name', 'Johnathan Doe');
    version = res.body.Version;
  });

  test('should delete a patient', async () => {
    await request(app)
      .delete(`/user/patients/${patientId}`)
      .set('Authorization', `Bearer ${token}`) // Assuming authorization token or email is passed this way
      .expect(204);
  });

  // Invalid token test cases
  describe('Invalid Token Tests', () => {
    test('should fail to list patients with an invalid token', async () => {
      await request(app)
        .get('/user/patients')
        .set('Authorization', `Bearer ${invalidToken}`)
        .expect(401); // Unauthorized
    });

    test('should fail to create a new patient with an invalid token', async () => {
      const newPatient = {
        Name: 'John Doe',
        Age: 30,
        Gender: 'Male',
        Phone: '1234567890',
        Email: 'john.doe@example.com',
        Address: '123 Main St',
      };

      await request(app)
        .post('/user/patients')
        .set('Authorization', `Bearer ${invalidToken}`)
        .send(newPatient)
        .expect(401); // Unauthorized
    });

    test('should fail to get a patient by ID with an invalid token', async () => {
      await request(app)
        .get(`/user/patients/${patientId}`)
        .set('Authorization', `Bearer ${invalidToken}`)
        .expect(401); // Unauthorized
    });

    test('should fail to update a patient with an invalid token', async () => {
      const updatedData = {
        name: 'Jane Doe Updated',
        Version: version
      };

      await request(app)
        .put(`/user/patients/${patientId}`)
        .set('Authorization', `Bearer ${invalidToken}`)
        .send(updatedData)
        .expect(401); // Unauthorized
    });

    test('should fail to delete a patient with an invalid token', async () => {
      await request(app)
        .delete(`/user/patients/${patientId}`)
        .set('Authorization', `Bearer ${invalidToken}`)
        .expect(401); // Unauthorized
    });
  });
});
