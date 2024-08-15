import request from 'supertest';
import express from 'express';
import router from '../routes/routes';
import AuthService from '../service/AuthService.js';

const app = express();
app.use(express.json());
app.use('/', router);
app.use((err, req, res, next) => {
  console.log(err);
  return res.status(500).json();
});

describe('GP Appointment Management API', () => {
  let appointmentId;
  let gpId = '12345678';

  const username = 'testuser';
  const token = AuthService.generateToken({username});

  test('should list all appointments', async () => {
    const res = await request(app)
      .get('/appointments')
      .expect('Content-Type', /json/)
      .expect(200);
      
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('should create a new appointment', async () => {
    const newAppointment = {
      patientName: "Jane Doe",
      gpId: gpId,
      username: username,
      gpName: "Dr. Brown",
      date: "2023-08-02",
      time: "11:00",
      reason: "Follow-up check",
      status: "pending",
    };

    const res = await request(app)
      .post('/appointments')
      .send(newAppointment)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(res.body).toHaveProperty('patientName', 'Jane Doe');
    expect(res.body).toHaveProperty('gpId', gpId);
    expect(res.body).toHaveProperty('gpName', 'Dr. Brown');
    expect(res.body).toHaveProperty('date', '2023-08-02');
    expect(res.body).toHaveProperty('time', '11:00');
    expect(res.body).toHaveProperty('reason', 'Follow-up check');
    expect(res.body).toHaveProperty('status', 'pending');
    appointmentId = res.body.id;
  });

  test('should list appointment by gpId, startDate and endDate', async () => {
    const res = await request(app)
      .get(`/appointments?gpId=${gpId}&startDate=2023-08-01&endDate=2023-08-02`)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(res.body[0]).toHaveProperty('patientName', 'Jane Doe');
    expect(res.body[0]).toHaveProperty('gpId', gpId);
    expect(res.body[0]).toHaveProperty('gpName', 'Dr. Brown');
    expect(res.body[0]).toHaveProperty('date', '2023-08-02');
    expect(res.body[0]).toHaveProperty('time', '11:00');
    expect(res.body[0]).toHaveProperty('reason', 'Follow-up check');
    expect(res.body[0]).toHaveProperty('status', 'pending');
    expect(res.body[0]).toHaveProperty('id', appointmentId);
  });

  test('should list appointment under specific user by gpId, startDate and endDate', async () => {
    const res = await request(app)
      .get(`/user/appointments?gpId=${gpId}&startDate=2023-08-01&endDate=2023-08-02`)
      .set('Authorization', `Bearer ${token}`) 
      .expect('Content-Type', /json/)
      .expect(200);
    expect(res.body[0]).toHaveProperty('patientName', 'Jane Doe');
    expect(res.body[0]).toHaveProperty('gpId', gpId);
    expect(res.body[0]).toHaveProperty('gpName', 'Dr. Brown');
    expect(res.body[0]).toHaveProperty('date', '2023-08-02');
    expect(res.body[0]).toHaveProperty('time', '11:00');
    expect(res.body[0]).toHaveProperty('reason', 'Follow-up check');
    expect(res.body[0]).toHaveProperty('status', 'pending');
    expect(res.body[0]).toHaveProperty('id', appointmentId);
  });

  test('should not list appointment out of startDate and endDate', async () => {
    const res = await request(app)
      .get(`/appointments?gpId=${gpId}&startDate=2023-08-03&endDate=2023-08-03`)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(res.body.length).toBe(0);
  });

  test('should get an appointment by ID', async () => {
    const res = await request(app)
      .get(`/appointments/${appointmentId}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toHaveProperty('id', appointmentId);
  });

  test('should update an appointment', async () => {
    const updatedData = {
      patientName: "Jane Doe Updated",
      gpName: "Dr. Brown",
      date: "2023-08-03",
      time: "12:00",
      reason: "Updated reason",
      status: "scheduled"
    };

    const res = await request(app)
      .put(`/appointments/${appointmentId}`)
      .send(updatedData)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toHaveProperty('patientName', 'Jane Doe Updated');
  });

  test('should delete an appointment', async () => {
    await request(app)
      .delete(`/appointments/${appointmentId}`)
      .expect(204);
  });
});
