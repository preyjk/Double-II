import Doctor from '../dal/Doctor.js';
import AuthService from '../service/AuthService.js';
import {doctors} from './data/doctor.js';

const users = [
  {
    username: 'admin',
    password: 'admin',
    roles: ['admin'],
  }
]

export const insertExampleData = () => {
  console.log('Inserting data to database ...')
  doctors.forEach(async doctor => {
    await Doctor.create(doctor);
  });
  users.forEach(async user => {
    await AuthService.signup(user);
  });
  console.log("Records inserted.");
}
