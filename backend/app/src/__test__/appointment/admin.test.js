import request from 'supertest';
import express from 'express';
import router from '../../routes/routes';
import AuthService from '../../service/AuthService.js';

const app = express();
app.use(express.json());
app.use('/', router);
app.use((err, req, res, next) => {
  console.log(err);
  return res.status(500).json();
});

describe('Admin Maintain Appointments - Happy Flow', () => {
  let appointmentId;
  let doctorId = '3';
  let scheduleId1, scheduleId2;
  let version;
  let bookingReference, lastName, dateOfBirth;

  let adminToken;

  const schedule1 = {
    DoctorId: doctorId,
    DoctorName: 'John Smith',
    Date: '2024-11-11',
    StartTime: '09:00',
    EndTime: '09:15',
  }

  const schedule2 = {
    DoctorId: doctorId,
    DoctorName: 'John Smith',
    Date: '2024-11-12',
    StartTime: '09:15',
    EndTime: '09:30',
  }

  beforeAll(async () => {
    const loginRes = await request(app)
      .post('/public/auth/login')
      .send({ username: 'admin', password: 'admin' })
      .expect('Content-Type', /json/)
      .expect(200);
    adminToken = loginRes.body.token;

    const res = await request(app)
      .post('/admin/schedules')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(schedule1)
      .expect('Content-Type', /json/)
      .expect(201);
    expect(res.body).toHaveProperty('DoctorId', doctorId);
    expect(res.body).toHaveProperty('DoctorName', 'John Smith');
    expect(res.body).toHaveProperty('Date', '2024-11-11');
    expect(res.body).toHaveProperty('StartTime', '09:00');
    expect(res.body).toHaveProperty('EndTime', '09:15');
    expect(res.body).toHaveProperty('Status', 'available');
    scheduleId1 = res.body.Id;

    const res2 = await request(app)
      .post('/admin/schedules')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(schedule2)
      .expect('Content-Type', /json/)
      .expect(201);
    expect(res2.body).toHaveProperty('DoctorId', doctorId);
    expect(res2.body).toHaveProperty('DoctorName', 'John Smith');
    expect(res2.body).toHaveProperty('Date', '2024-11-12');
    expect(res2.body).toHaveProperty('StartTime', '09:15');
    expect(res2.body).toHaveProperty('EndTime', '09:30');
    expect(res2.body).toHaveProperty('Status', 'available');
    scheduleId2 = res2.body.Id;
  });


  test('should list all appointments', async () => {
    const res = await request(app)
      .get('/admin/appointments')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  test('should create a new appointment', async () => {
    const newAppointment = {
      ScheduleId: scheduleId1,
      LastName: "Doe",
      FirstName: "Jane",
      DateOfBirth: "1990-01-01",
      Reason: "Follow-up check",
    };

    const res = await request(app)
      .post('/public/appointments')
      .send(newAppointment)
      .expect('Content-Type', /json/)
      .expect(201);


    expect(res.body).toHaveProperty('ScheduleId', scheduleId1);
    expect(res.body).toHaveProperty('DoctorId', doctorId);
    expect(res.body).toHaveProperty('DoctorName', 'John Smith');
    expect(res.body).toHaveProperty('Date', '2024-11-11');
    expect(res.body).toHaveProperty('StartTime', '09:00');
    expect(res.body).toHaveProperty('EndTime', '09:15');
    expect(res.body).toHaveProperty('Reason', 'Follow-up check');
    expect(res.body).toHaveProperty('LastName', 'Doe');
    expect(res.body).toHaveProperty('FirstName', 'Jane');
    expect(res.body).toHaveProperty('DateOfBirth', '1990-01-01');
    appointmentId = res.body.Id;
    bookingReference = res.body.BookingReference;
    lastName = res.body.LastName;
    dateOfBirth = res.body.DateOfBirth;
    version = res.body.Version;
  });

  test('should list appointment by doctorId, startDate and endDate', async () => {
    const res = await request(app)
      .get(`/admin/appointments?doctorId=${doctorId}&startDate=2024-11-11&endDate=2024-11-11`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body[0]).toHaveProperty('DoctorId', doctorId);
    expect(res.body[0]).toHaveProperty('DoctorName', 'John Smith');
    expect(res.body[0]).toHaveProperty('Date', '2024-11-11');
    expect(res.body[0]).toHaveProperty('StartTime', '09:00');
    expect(res.body[0]).toHaveProperty('EndTime', '09:15');
    expect(res.body[0]).toHaveProperty('Reason', 'Follow-up check');
    expect(res.body[0]).toHaveProperty('Id', appointmentId);
    expect(res.body[0]).toHaveProperty('LastName', 'Doe');
    expect(res.body[0]).toHaveProperty('FirstName', 'Jane');
    expect(res.body[0]).toHaveProperty('DateOfBirth', '1990-01-01');
    expect(res.body[0]).toHaveProperty('BookingReference', bookingReference);
  });

  test('should not list appointment out of startDate and endDate', async () => {
    const res = await request(app)
      .get(`/admin/appointments?doctorId=${doctorId}&startDate=2023-08-03&endDate=2023-08-03`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(res.body.length).toBe(0);
  });

  test('should complete an appointment', async () => {
    const res = await request(app)
      .post(`/admin/appointments/${appointmentId}/complete`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send()
      .expect('Content-Type', /json/)
      .expect(200);
    expect(res.body).toHaveProperty('Status', 'completed');
  });

  test('should delete an appointment', async () => {
    await request(app)
      .delete(`/admin/appointments/${appointmentId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(204);
  });

  afterAll(async () => {
    await request(app)
      .delete(`/admin/schedules/${scheduleId1}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(204);

    await request(app)
      .delete(`/admin/schedules/${scheduleId2}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(204);
  });
});
