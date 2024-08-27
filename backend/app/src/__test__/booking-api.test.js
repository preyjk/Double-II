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
  let bookingReference, lastName, dateOfBirth;
  let version;

  const username = 'testuser';
  const token = AuthService.generateToken({ username });
  const adminToken = AuthService.generateToken({ username: 'admin', roles: ['admin'] });

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
      LastName: "Doe",
      FirstName: "Jane",
      DateOfBirth: "1990-01-01",
      UserId: username,
      Reason: "Follow-up check",
      Status: "pending",
    };

    const res = await request(app)
      .post('/appointments')
      .send(newAppointment)
      .expect('Content-Type', /json/)
      .expect(201);


    expect(res.body).toHaveProperty('ScheduleId', scheduleId);
    expect(res.body).toHaveProperty('DoctorId', doctorId);
    expect(res.body).toHaveProperty('DoctorName', 'John Smith');
    expect(res.body).toHaveProperty('Date', '2024-11-11');
    expect(res.body).toHaveProperty('Time', '09:00');
    expect(res.body).toHaveProperty('Reason', 'Follow-up check');
    expect(res.body).toHaveProperty('Status', 'pending');
    expect(res.body).toHaveProperty('UserId', username);
    expect(res.body).toHaveProperty('LastName', 'Doe');
    expect(res.body).toHaveProperty('FirstName', 'Jane');
    expect(res.body).toHaveProperty('DateOfBirth', '1990-01-01');
    appointmentId = res.body.Id;
    bookingReference = res.body.BookingReference;
    lastName = res.body.LastName;
    dateOfBirth = res.body.DateOfBirth;
    version = res.body.Version;
  });

  test('should get an appointment by booking reference', async () => {
    const res = await request(app)
      .get(`/appointment?reference=${bookingReference}&lastname=${lastName}&dob=${dateOfBirth}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toHaveProperty('Id', appointmentId);
    expect(res.body).toHaveProperty('ScheduleId', scheduleId);
    expect(res.body).toHaveProperty('DoctorId', doctorId);
    expect(res.body).toHaveProperty('DoctorName', 'John Smith');
    expect(res.body).toHaveProperty('Date', '2024-11-11');
    expect(res.body).toHaveProperty('Time', '09:00');
    expect(res.body).toHaveProperty('Reason', 'Follow-up check');
    expect(res.body).toHaveProperty('Status', 'pending');
    expect(res.body).toHaveProperty('UserId', username);
    expect(res.body).toHaveProperty('LastName', 'Doe');
    expect(res.body).toHaveProperty('FirstName', 'Jane');
    expect(res.body).toHaveProperty('DateOfBirth', '1990-01-01');
    expect(res.body).toHaveProperty('BookingReference', bookingReference);
  });

  test('should not create a new appointment with same schedule', async () => {
    const newAppointment = {
      ScheduleId: scheduleId,
      LastName: "Doe",
      FirstName: "Jane Jr",
      DateOfBirth: "1990-01-01",
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
      LastName: "Doe",
      FirstName: "Jane Jr",
      DateOfBirth: "1990-01-01",
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

    expect(res.body[0]).toHaveProperty('DoctorId', doctorId);
    expect(res.body[0]).toHaveProperty('DoctorName', 'John Smith');
    expect(res.body[0]).toHaveProperty('Date', '2024-11-11');
    expect(res.body[0]).toHaveProperty('Time', '09:00');
    expect(res.body[0]).toHaveProperty('Reason', 'Follow-up check');
    expect(res.body[0]).toHaveProperty('Status', 'pending');
    expect(res.body[0]).toHaveProperty('Id', appointmentId);
    expect(res.body[0]).toHaveProperty('UserId', username);
    expect(res.body[0]).toHaveProperty('LastName', 'Doe');
    expect(res.body[0]).toHaveProperty('FirstName', 'Jane');
    expect(res.body[0]).toHaveProperty('DateOfBirth', '1990-01-01');
    expect(res.body[0]).toHaveProperty('BookingReference', bookingReference);
  });

  test('should list appointment under specific user by doctorId, startDate and endDate', async () => {
    const res = await request(app)
      .get(`/user/appointments?doctorId=${doctorId}&startDate=2024-11-01&endDate=2024-11-12`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body[0]).toHaveProperty('DoctorId', doctorId);
    expect(res.body[0]).toHaveProperty('DoctorName', 'John Smith');
    expect(res.body[0]).toHaveProperty('Date', '2024-11-11');
    expect(res.body[0]).toHaveProperty('Time', '09:00');
    expect(res.body[0]).toHaveProperty('Reason', 'Follow-up check');
    expect(res.body[0]).toHaveProperty('Status', 'pending');
    expect(res.body[0]).toHaveProperty('Id', appointmentId);
    expect(res.body[0]).toHaveProperty('UserId', username);
    expect(res.body[0]).toHaveProperty('LastName', 'Doe');
    expect(res.body[0]).toHaveProperty('FirstName', 'Jane');
    expect(res.body[0]).toHaveProperty('DateOfBirth', '1990-01-01');
    expect(res.body[0]).toHaveProperty('BookingReference', bookingReference);
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
      FirstName: "Jane Updated",
      Version: version,
    };

    const res = await request(app)
      .put(`/appointments/${appointmentId}`)
      .send(updatedData)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toHaveProperty('FirstName', 'Jane Updated');
    version = res.body.Version;
  });

  test('should delete an appointment', async () => {
    await request(app)
      .delete(`/appointments/${appointmentId}`)
      .expect(204);
  });
});
