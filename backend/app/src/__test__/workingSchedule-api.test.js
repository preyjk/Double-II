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
  const token = AuthService.generateToken({username: 'admin', roles: ['admin']});
  let scheduleId;
  const gpId = '12345678';

  test('should create a new working schedule', async () => {
    const newSchedule = {
      gpId: gpId,
      date: "2023-08-10",
      startTime: "09:00",
      endTime: "17:00",
    };

    const res = await request(app)
      .post('/schedules')
      .set('Authorization', `Bearer ${token}`) 
      .send(newSchedule)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(res.body).toHaveProperty('gpId', gpId);
    expect(res.body).toHaveProperty('date', '2023-08-10');
    expect(res.body).toHaveProperty('startTime', '09:00');
    expect(res.body).toHaveProperty('endTime', '17:00');
    scheduleId = res.body.id; // Assuming 'id' is part of the response
  });

  test('should list all schedules for a given gpId and date range', async () => {
    const res = await request(app)
      .get(`/schedules?gpId=${gpId}&startDate=2023-08-10&endDate=2023-08-10`)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(res.body[0].id).toBe(scheduleId);
    // Add further expectations based on the actual data structure
  });

  test('should update an existing schedule', async () => {
    const updatedData = {
      scheduleDate: "2023-08-12",
      startTime: "10:00",
      endTime: "16:00",
    };

    const res = await request(app)
      .put(`/schedules/${scheduleId}`)
      .set('Authorization', `Bearer ${token}`) 
      .send(updatedData)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toHaveProperty('scheduleDate', '2023-08-12');
    expect(res.body).toHaveProperty('startTime', '10:00');
    expect(res.body).toHaveProperty('endTime', '16:00');
  });

  test('should delete an existing schedule', async () => {
    await request(app)
      .delete(`/schedules/${scheduleId}`)
      .set('Authorization', `Bearer ${token}`) 
      .expect(204);
  });
});
