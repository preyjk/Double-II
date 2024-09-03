import Doctor from '../dal/Doctor.js';
import AuthService from '../service/AuthService.js';
import {doctors} from './data/doctor.js';
import { dynamo } from '../dal/DynamoDB.js';

const users = [
  {
    email: 'admin',
    password: 'admin',
    roles: ['admin'],
  },
  {
    email: 'test',
    password: 'test'
  }
]

export const insertExampleData = () => {
  console.log('Inserting data to database ...')
  doctors.forEach(async doctor => {
    await dynamo.send(Doctor.create(doctor));
  });
  users.forEach(async user => {
    await AuthService.signup(user);
  });
  console.log("Records inserted.");
}
