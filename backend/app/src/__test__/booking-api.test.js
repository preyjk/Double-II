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
  let doctorId = '12345678';
  let scheduleId;

  const username = 'testuser';
  const token = AuthService.generateToken({username});
  const adminToken = AuthService.generateToken({username: 'admin', roles: ['admin']});

  const schedule = {
    DoctorId: doctorId,
    DoctorName: 'John Smith',
    Date: '2024-11-11',
    Time: '09:00'
  }

  test('should list all appointments', async () => {
    const res = await request(app)
      .get('/appointments')
      .expect('Content-Type', /json/)
      .expect(200);
      
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('should create working schedule for a doctor', async () => {
    const res = await request(app)
      .post('/schedules')
      .set('Authorization', `Bearer ${adminToken}`) 
      .send(schedule)
      .expect('Content-Type', /json/)
      .expect(201);
    expect(res.body).toHaveProperty('DoctorId', doctorId);
    expect(res.body).toHaveProperty('DoctorName', 'John Smith');
    expect(res.body).toHaveProperty('Date', '2024-11-11');
    expect(res.body).toHaveProperty('Time', '09:00'); 
    expect(res.body).toHaveProperty('Status', 'available');
    scheduleId = res.body.Id;
  });

  test('should create a new appointment', async () => {
    const newAppointment = {
      ScheduleId: scheduleId,
      PatientName: "Jane Doe",
      UserId: username,
      Reason: "Follow-up check",
      Status: "pending",
    };

    const res = await request(app)
      .post('/appointments')
      .send(newAppointment)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(res.body).toHaveProperty('PatientName', 'Jane Doe');
    expect(res.body).toHaveProperty('ScheduleId', scheduleId);
    expect(res.body).toHaveProperty('DoctorId', doctorId);
    expect(res.body).toHaveProperty('DoctorName', 'John Smith');
    expect(res.body).toHaveProperty('Date', '2024-11-11');
    expect(res.body).toHaveProperty('Time', '09:00');
    expect(res.body).toHaveProperty('Reason', 'Follow-up check');
    expect(res.body).toHaveProperty('Status', 'pending');
    appointmentId = res.body.Id;
  });

  test('should not create a new appointment with same schedule', async () => {
    const newAppointment = {
      ScheduleId: scheduleId,
      PatientName: "Jane Doe Jr",
      UserId: username,
      Reason: "Follow-up check",
      Status: "pending",
    };

    await request(app)
      .post('/appointments')
      .send(newAppointment)
      .expect('Content-Type', /json/)
      .expect(400);
  });

  test('should not create a new appointment with invalid schedule', async () => {
    const newAppointment = {
      ScheduleId: 'null',
      PatientName: "Jane Doe Jr",
      UserId: username,
      Reason: "Follow-up check",
      Status: "pending",
    };

    await request(app)
      .post('/appointments')
      .send(newAppointment)
      .expect('Content-Type', /json/)
      .expect(400);
  });

  test('should list appointment by doctorId, startDate and endDate', async () => {
    const res = await request(app)
      .get(`/appointments?doctorId=${doctorId}&startDate=2024-11-11&endDate=2024-11-11`)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(res.body[0]).toHaveProperty('PatientName', 'Jane Doe');
    expect(res.body[0]).toHaveProperty('DoctorId', doctorId);
    expect(res.body[0]).toHaveProperty('DoctorName', 'John Smith');
    expect(res.body[0]).toHaveProperty('Date', '2024-11-11');
    expect(res.body[0]).toHaveProperty('Time', '09:00'); 
    expect(res.body[0]).toHaveProperty('Reason', 'Follow-up check');
    expect(res.body[0]).toHaveProperty('Status', 'pending');
    expect(res.body[0]).toHaveProperty('Id', appointmentId);
  });

  test('should list appointment under specific user by doctorId, startDate and endDate', async () => {
    const res = await request(app)
      .get(`/user/appointments?doctorId=${doctorId}&startDate=2024-11-01&endDate=2024-11-12`)
      .set('Authorization', `Bearer ${token}`) 
      .expect('Content-Type', /json/)
      .expect(200);
      expect(res.body[0]).toHaveProperty('PatientName', 'Jane Doe');
      expect(res.body[0]).toHaveProperty('DoctorId', doctorId);
      expect(res.body[0]).toHaveProperty('DoctorName', 'John Smith');
      expect(res.body[0]).toHaveProperty('Date', '2024-11-11');
      expect(res.body[0]).toHaveProperty('Time', '09:00'); 
      expect(res.body[0]).toHaveProperty('Reason', 'Follow-up check');
      expect(res.body[0]).toHaveProperty('Status', 'pending');
      expect(res.body[0]).toHaveProperty('Id', appointmentId);
  });

  test('should not list appointment out of startDate and endDate', async () => {
    const res = await request(app)
      .get(`/appointments?doctorId=${doctorId}&startDate=2023-08-03&endDate=2023-08-03`)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(res.body.length).toBe(0);
  });

  test('should get an appointment by ID', async () => {
    const res = await request(app)
      .get(`/appointments/${appointmentId}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toHaveProperty('Id', appointmentId);
  });

  test('should update an appointment', async () => {
    const updatedData = {
      PatientName: "Jane Doe Updated",
    };

    const res = await request(app)
      .put(`/appointments/${appointmentId}`)
      .send(updatedData)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toHaveProperty('PatientName', 'Jane Doe Updated');
  });

  test('should delete an appointment', async () => {
    await request(app)
      .delete(`/appointments/${appointmentId}`)
      .expect(204);
  });
});
