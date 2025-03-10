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

describe('Unregistered User Making Appointments - Happy Flow', () => {
  let appointmentId;
  let doctorId = '1';
  let scheduleId1, scheduleId2;
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
      .send({ email: 'admin', password: 'admin' })
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

  test('should list available dates', async () => {
    const res = await request(app)
      .get(`/public/schedules/available-dates?doctorId=${doctorId}&startDate=2024-11-01&endDate=2024-11-30`)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toContain('2024-11-11');
    expect(res.body).toContain('2024-11-12');
  });

  test('should list available times', async () => {
    const res = await request(app)
      .get(`/public/schedules/available-timeslots?doctorId=${doctorId}&date=2024-11-11`)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ StartTime: '09:00' })
      ])
    );

    const res2 = await request(app)
      .get(`/public/schedules/available-timeslots?doctorId=${doctorId}&date=2024-11-12`)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(Array.isArray(res2.body)).toBe(true);
    expect(res2.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ StartTime: '09:15' })
      ])
    );
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
    expect(res.body).toHaveProperty('Status', 'active');
    expect(res.body).toHaveProperty('LastName', 'Doe');
    expect(res.body).toHaveProperty('FirstName', 'Jane');
    expect(res.body).toHaveProperty('DateOfBirth', '1990-01-01');
    appointmentId = res.body.Id;
    bookingReference = res.body.BookingReference;
    lastName = res.body.LastName;
    dateOfBirth = res.body.DateOfBirth;
  });

  test('should get an appointment by booking reference', async () => {
    const res = await request(app)
      .get(`/public/appointments?reference=${bookingReference}&lastname=${lastName}&dob=${dateOfBirth}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toHaveProperty('Id', appointmentId);
    expect(res.body).toHaveProperty('ScheduleId', scheduleId1);
    expect(res.body).toHaveProperty('DoctorId', doctorId);
    expect(res.body).toHaveProperty('DoctorName', 'John Smith');
    expect(res.body).toHaveProperty('Date', '2024-11-11');
    expect(res.body).toHaveProperty('StartTime', '09:00');
    expect(res.body).toHaveProperty('EndTime', '09:15');
    expect(res.body).toHaveProperty('Reason', 'Follow-up check');
    expect(res.body).toHaveProperty('Status', 'active');
    expect(res.body).toHaveProperty('LastName', 'Doe');
    expect(res.body).toHaveProperty('FirstName', 'Jane');
    expect(res.body).toHaveProperty('DateOfBirth', '1990-01-01');
    expect(res.body).toHaveProperty('BookingReference', bookingReference);
  });

  test('should reschedule an appointment', async () => {
    const res = await request(app)
      .post(`/public/appointments/reschedule`)
      .send({ BookingReference: bookingReference, LastName: lastName, DateOfBirth: dateOfBirth, ScheduleId: scheduleId2 })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toHaveProperty('ScheduleId', scheduleId2);
    expect(res.body).toHaveProperty('DoctorId', doctorId);
    expect(res.body).toHaveProperty('DoctorName', 'John Smith');
    expect(res.body).toHaveProperty('Date', '2024-11-12');
    expect(res.body).toHaveProperty('StartTime', '09:15');
    expect(res.body).toHaveProperty('EndTime', '09:30');
    expect(res.body).toHaveProperty('Reason', 'Follow-up check');
    expect(res.body).toHaveProperty('Status', 'active');
    expect(res.body).toHaveProperty('LastName', 'Doe');
    expect(res.body).toHaveProperty('FirstName', 'Jane');
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
      .post('/public/appointments/cancel')
      .send({ BookingReference: bookingReference, LastName: lastName, DateOfBirth: dateOfBirth })
      .expect('Content-Type', /json/)
      .expect(200);
    expect(res.body).toHaveProperty('Id', appointmentId);
    expect(res.body).toHaveProperty('Status', 'cancelled');
  })

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
