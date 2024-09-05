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

describe('Registered User Making Appointments - Happy Flow', () => {
  let appointmentId1, appointmentId2;
  let doctorId = '2';
  let scheduleId1, scheduleId2;
  let bookingReference, lastName, dateOfBirth;
  let appointment1;

  let token;
  let adminToken;
  let UserId;

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
    const adminLoginRes = await request(app)
      .post('/public/auth/login')
      .send({ email: 'admin', password: 'admin' })
      .expect('Content-Type', /json/)
      .expect(200);
    adminToken = adminLoginRes.body.token;

    const loginRes = await request(app)
      .post('/public/auth/login')
      .send({ email: 'test', password: 'test' })
      .expect('Content-Type', /json/)
      .expect(200);
    token = loginRes.body.token;

    UserId = AuthService.verifyToken(token).data.id;

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

  test('should create a new appointment without login', async () => {
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
    appointmentId1 = res.body.Id;
    bookingReference = res.body.BookingReference;
    lastName = res.body.LastName;
    dateOfBirth = res.body.DateOfBirth;
  });

  test('should create a new appointment after login', async () => {
    const newAppointment = {
      ScheduleId: scheduleId2,
      LastName: "Doe",
      FirstName: "Jane",
      DateOfBirth: "1990-01-01",
      Reason: "Follow-up check",
    };

    const res = await request(app)
      .post('/user/appointments')
      .set('Authorization', `Bearer ${token}`)
      .send(newAppointment)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(res.body).toHaveProperty('ScheduleId', scheduleId2);
    expect(res.body).toHaveProperty('DoctorId', doctorId);
    expect(res.body).toHaveProperty('DoctorName', 'John Smith');
    expect(res.body).toHaveProperty('Date', '2024-11-12');
    expect(res.body).toHaveProperty('StartTime', '09:15');
    expect(res.body).toHaveProperty('EndTime', '09:30');
    expect(res.body).toHaveProperty('Reason', 'Follow-up check');
    expect(res.body).toHaveProperty('LastName', 'Doe');
    expect(res.body).toHaveProperty('FirstName', 'Jane');
    expect(res.body).toHaveProperty('DateOfBirth', '1990-01-01');
    appointmentId2 = res.body.Id;
  });

  test('should link appointment to user', async () => {
    const res = await request(app)
      .post(`/user/appointments/link`)
      .set('Authorization', `Bearer ${token}`)
      .send({ BookingReference: bookingReference, LastName: lastName, DateOfBirth: dateOfBirth })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toHaveProperty('Id', appointmentId1);
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
    expect(res.body).toHaveProperty('UserId', UserId);
  });

  test('should list appointment under specific user by doctorId, startDate and endDate', async () => {
    const res = await request(app)
      .get(`/user/appointments?doctorId=${doctorId}&startDate=2024-11-11&endDate=2024-11-11`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body[0]).toHaveProperty('DoctorId', doctorId);
    expect(res.body[0]).toHaveProperty('DoctorName', 'John Smith');
    expect(res.body[0]).toHaveProperty('Date', '2024-11-11');
    expect(res.body[0]).toHaveProperty('StartTime', '09:00');
    expect(res.body[0]).toHaveProperty('EndTime', '09:15');
    expect(res.body[0]).toHaveProperty('Reason', 'Follow-up check');
    expect(res.body[0]).toHaveProperty('Id', appointmentId1);
    expect(res.body[0]).toHaveProperty('UserId', UserId);
    expect(res.body[0]).toHaveProperty('LastName', 'Doe');
    expect(res.body[0]).toHaveProperty('FirstName', 'Jane');
    expect(res.body[0]).toHaveProperty('DateOfBirth', '1990-01-01');
    expect(res.body[0]).toHaveProperty('BookingReference', bookingReference);

    const res2 = await request(app)
      .get(`/user/appointments?doctorId=${doctorId}&startDate=2024-11-12&endDate=2024-11-12`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res2.body[0]).toHaveProperty('DoctorId', doctorId);
    expect(res2.body[0]).toHaveProperty('DoctorName', 'John Smith');
    expect(res2.body[0]).toHaveProperty('Date', '2024-11-12');
    expect(res2.body[0]).toHaveProperty('StartTime', '09:15');
    expect(res2.body[0]).toHaveProperty('EndTime', '09:30');
    expect(res2.body[0]).toHaveProperty('Reason', 'Follow-up check');
    expect(res2.body[0]).toHaveProperty('Id', appointmentId2);
    expect(res2.body[0]).toHaveProperty('UserId', UserId);
    expect(res2.body[0]).toHaveProperty('LastName', 'Doe');
    expect(res2.body[0]).toHaveProperty('FirstName', 'Jane');
    expect(res2.body[0]).toHaveProperty('DateOfBirth', '1990-01-01');
  });

  test('should not list appointment out of startDate and endDate', async () => {
    const res = await request(app)
      .get(`/user/appointments?doctorId=${doctorId}&startDate=2023-08-03&endDate=2023-08-03`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(res.body.length).toBe(0);
  });

  test('should get an appointment by ID', async () => {
    const res = await request(app)
      .get(`/user/appointments/${appointmentId1}`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toHaveProperty('Id', appointmentId1);
    appointment1 = res.body;
  });

  test('should update an appointment', async () => {
    const updatedData = {
      FirstName: 'Jane Updated',
      Version: appointment1.Version
    };
    const res = await request(app)
      .put(`/user/appointments/${appointmentId1}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedData)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toHaveProperty('FirstName', 'Jane Updated');
    appointment1 = res.body;
  });

  test('should delete an appointment', async () => {
    await request(app)
      .delete(`/admin/appointments/${appointmentId2}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(204);
  });


  test('should reschedule an appointment', async () => {
    const res = await request(app)
      .post(`/user/appointments/${appointmentId1}/reschedule`)
      .set('Authorization', `Bearer ${token}`)
      .send({ ScheduleId: scheduleId2 })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toHaveProperty('ScheduleId', scheduleId2);
    expect(res.body).toHaveProperty('DoctorId', doctorId);
    expect(res.body).toHaveProperty('DoctorName', 'John Smith');
    expect(res.body).toHaveProperty('Date', '2024-11-12');
    expect(res.body).toHaveProperty('StartTime', '09:15');
    expect(res.body).toHaveProperty('EndTime', '09:30');
    expect(res.body).toHaveProperty('Reason', 'Follow-up check');
    expect(res.body).toHaveProperty('UserId', UserId);
    expect(res.body).toHaveProperty('LastName', 'Doe');
    expect(res.body).toHaveProperty('FirstName', 'Jane Updated');
    expect(res.body).toHaveProperty('DateOfBirth', '1990-01-01');
    expect(res.body).toHaveProperty('BookingReference', bookingReference);

    const res2 = await request(app)
      .get(`/admin/schedules?doctorId=${doctorId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect('Content-Type', /json/)
      .expect(200);
    res2.body.forEach(schedule => {
      expect([scheduleId1, scheduleId2]).toContain(schedule.Id);
      if (schedule.Id === scheduleId1) {
        expect(schedule).toHaveProperty('Status', 'available');
      } else if (schedule.Id === scheduleId2) {
        expect(schedule).toHaveProperty('Status', 'occupied');
      }
    });
  });

  test('should cancel an appointment', async () => {
    const res = await request(app)
      .post(`/user/appointments/${appointmentId1}/cancel`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(res.body).toHaveProperty('Status', 'cancelled');
  });

  test('should delete an appointment', async () => {
    await request(app)
      .delete(`/admin/appointments/${appointmentId1}`)
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
