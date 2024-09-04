import request from 'supertest';
import express from 'express';
import router from '../routes/routes'; // Adjust the path as necessary
import AuthService from '../service/AuthService.js';

const app = express();
app.use(express.json());
app.use('/', router);
app.use((err, req, res, next) => {
  console.log(err);
  return res.status(500).json();
});

describe('Working Schedule API', () => {
  let token;
  let scheduleId;
  let version;
  const doctorId = '12345678';

  beforeAll(async () => {
    const res = await request(app)
      .post('/public/auth/login')
      .send({ username: 'admin', password: 'admin' })
      .expect('Content-Type', /json/)
      .expect(200);
    token = res.body.token;
  });

  test('should create a new working schedule', async () => {
    const newSchedule = {
      DoctorId: doctorId,
      DoctorName: 'john smith',
      Date: "2023-08-10",
      StartTime: "09:00",
      EndTime: "17:00",
    };

    const res = await request(app)
      .post('/admin/schedules')
      .set('Authorization', `Bearer ${token}`) 
      .send(newSchedule)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(res.body).toHaveProperty('DoctorId', doctorId);
    expect(res.body).toHaveProperty('Date', '2023-08-10');
    expect(res.body).toHaveProperty('StartTime', '09:00');
    expect(res.body).toHaveProperty('EndTime', '17:00');
    expect(res.body).toHaveProperty('DoctorName', 'john smith');
    scheduleId = res.body.Id; // Assuming 'id' is part of the response
    version = res.body.Version;
  });

  test('should list all schedules for a given doctorId and date range', async () => {
    const res = await request(app)
      .get(`/admin/schedules?doctorId=${doctorId}&startDate=2023-08-10&endDate=2023-08-10`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(res.body[0].Id).toBe(scheduleId);
  });

  test('should update an existing schedule', async () => {
    const updatedData = {
      Date: "2023-08-12",
      StartTime: "10:00",
      EndTime: "16:00",
      Version: version,
    };

    const res = await request(app)
      .put(`/admin/schedules/${scheduleId}`)
      .set('Authorization', `Bearer ${token}`) 
      .send(updatedData)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toHaveProperty('Date', '2023-08-12');
    expect(res.body).toHaveProperty('StartTime', '10:00');
    expect(res.body).toHaveProperty('EndTime', '16:00');
    version = res.body.Version;
  });

  test('should delete an existing schedule', async () => {
    await request(app)
      .delete(`/admin/schedules/${scheduleId}`)
      .set('Authorization', `Bearer ${token}`) 
      .expect(204);
  });
});
