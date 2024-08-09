import { describe, it } from 'mocha';
import { expect } from 'chai';
import request from 'supertest';

const apiUrl = 'http://backend:8080';

describe('GP Appointment Management API', () => {
  var appointmentId;
  it('should list all appointments', async () => {
    const res = await request(apiUrl)
      .get('/appointments')
      .expect('Content-Type', /json/)
      .expect(200);
      
    expect(res.body).to.be.an('array');
  });

  it('should create a new appointment', async () => {
    const newAppointment = {
      patientName: "Jane Doe",
      gpName: "Dr. Brown",
      date: "2023-08-02",
      time: "11:00",
      reason: "Follow-up check",
      status: "pending",
    };

    const res = await request(apiUrl)
      .post('/appointments')
      .send(newAppointment)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(res.body).to.have.property('patientName', 'Jane Doe');
    expect(res.body).to.have.property('gpName', 'Dr. Brown');
    expect(res.body).to.have.property('date', '2023-08-02');
    expect(res.body).to.have.property('time', '11:00');
    expect(res.body).to.have.property('reason', 'Follow-up check');
    expect(res.body).to.have.property('status', 'pending');
    appointmentId = res.body.id;
  });

  it('should get an appointment by ID', async () => {
    const res = await request(apiUrl)
      .get(`/appointments/${appointmentId}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).to.have.property('id', appointmentId);
  });

  it('should update an appointment', async () => {
    const updatedData = {
      patientName: "Jane Doe Updated",
      gpName: "Dr. Brown",
      date: "2023-08-03",
      time: "12:00",
      reason: "Updated reason",
      status: "scheduled"
    };

    const res = await request(apiUrl)
      .put(`/appointments/${appointmentId}`)
      .send(updatedData)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).to.have.property('patientName', 'Jane Doe Updated');
  });

  it('should delete an appointment', async () => {
    await request(apiUrl)
      .delete(`/appointments/${appointmentId}`)
      .expect(204);
  });
});
