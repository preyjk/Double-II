import { describe, it } from 'mocha';
import { expect } from 'chai';
import request from 'supertest';

const API_BASE_URL = 'http://backend:3000';

describe('User Authentication API', function() {
  
    let username = `testuser_${Math.floor(Math.random() * 10000)}`;
    let password = 'testpassword';
  
    it('should sign up a new user', async function() {
      await request(API_BASE_URL)
        .post('/signup')
        .send({ username, password })
        .expect(200)
        .then(response => {
          expect(response.text).to.equal('"Signup successful"');
        });
    });
  
    it('should not sign up an existing user', async function() {
      await request(API_BASE_URL)
        .post('/signup')
        .send({ username, password })
        .expect(400)
        .then(response => {
          expect(response.text).to.equal('"User already exists"');
        });
    });
  
    it('should log in an existing user', async function() {
      await request(API_BASE_URL)
        .post('/login')
        .send({ username, password })
        .expect(200)
        .then(response => {
          expect(response.body).to.have.property('token');
          const token = response.body.token;
          expect(token).to.be.a('string');
        });
    });
  
    it('should not log in with incorrect password', async function() {
      await request(API_BASE_URL)
        .post('/login')
        .send({ username, password: 'wrongpassword' })
        .expect(401)
        .then(response => {
          expect(response.text).to.equal('"Unauthorized"');
        });
    });
  });