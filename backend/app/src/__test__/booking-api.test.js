import request from 'supertest';
import express from 'express';
import router from '../routes/routes';

const app = express();
app.use(express.json());
app.use('/', router);

describe('GP Appointment Management API', () => {
  let appointmentId;

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
    expect(res.body).toHaveProperty('gpName', 'Dr. Brown');
    expect(res.body).toHaveProperty('date', '2023-08-02');
    expect(res.body).toHaveProperty('time', '11:00');
    expect(res.body).toHaveProperty('reason', 'Follow-up check');
    expect(res.body).toHaveProperty('status', 'pending');
    appointmentId = res.body.id;
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
