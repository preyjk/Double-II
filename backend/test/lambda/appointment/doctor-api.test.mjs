import { describe, it } from 'mocha';
import { expect } from 'chai';
import request from 'supertest';

const apiUrl = 'http://backend:3000';  // Adjust this URL to point to your API endpoint

describe('Doctor API End-to-End Tests', () => {
  let doctorId;

  it('should list all doctors', async () => {
    const res = await request(apiUrl)
      .get('/doctors')
      .expect('Content-Type', /json/)
      .expect(200);
      
    expect(res.body).to.be.an('array');
  });

  it('should create a new doctor', async () => {
    const newDoctor = {
      name: 'Dr. Smith',
      specialty: 'Cardiology',
      phone: '1234567890',
      email: 'dr.smith@example.com'
    };

    const res = await request(apiUrl)
      .post('/doctors')
      .send(newDoctor)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(res.body).to.have.property('name', 'Dr. Smith');
    expect(res.body).to.have.property('specialty', 'Cardiology');
    expect(res.body).to.have.property('phone', '1234567890');
    expect(res.body).to.have.property('email', 'dr.smith@example.com');
    doctorId = res.body.id;  // Save the doctor ID for subsequent tests
  });

  it('should get a doctor by ID', async () => {
    const res = await request(apiUrl)
      .get(`/doctors/${doctorId}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).to.have.property('id', doctorId);
  });

  it('should update an existing doctor', async () => {
    const updatedData = {
      name: 'Dr. John Smith'
    };

    const res = await request(apiUrl)
      .put(`/doctors/${doctorId}`)
      .send(updatedData)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).to.have.property('name', 'Dr. John Smith');
  });

  it('should delete a doctor', async () => {
    await request(apiUrl)
      .delete(`/doctors/${doctorId}`)
      .expect(204);
  });
});
