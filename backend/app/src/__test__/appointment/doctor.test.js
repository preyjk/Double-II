import request from 'supertest';
import express from 'express';
import router from '../../routes/routes';
import EmailService from '../../service/EmailService';

const app = express();
app.use(express.json());
app.use('/', router);
app.use((err, req, res, next) => {
    console.log(err);
    return res.status(500).json();
});

describe('Doctor appointment API', () => {
    let adminToken, doctorToken;
    let doctorId;
    let scheduleId1, scheduleId2;
    let appointmentId;

    jest.mock('../../service/EmailService');

    beforeEach(() => {
        jest.clearAllMocks();
    });

    beforeAll(async () => {
        const adminResponse = await request(app)
            .post('/public/auth/login')
            .send({
                email: 'admin',
                password: 'admin'
            });
        adminToken = adminResponse.body.token;

        const doctorListResponse = await request(app)
            .get('/public/doctors')
            .set('Authorization', `Bearer ${adminToken}`);
        doctorId = doctorListResponse.body[2].Id;

        const sendInitialPasswordEmailSpy = jest.spyOn(EmailService, 'sendInitialPasswordEmail')
        await request(app)
            .post('/admin/users/doctor')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({doctorId});
        expect(sendInitialPasswordEmailSpy).toHaveBeenCalled();
        const [[{ to: doctorEmail, password: doctorPassword }]] = sendInitialPasswordEmailSpy.mock.calls

        const doctorLoginResponse = await request(app)
            .post('/public/auth/login')
            .send({email: doctorEmail, password: doctorPassword});
        doctorToken = doctorLoginResponse.body.token;
        console.log(doctorLoginResponse.body);
        console.log(doctorToken, doctorEmail, doctorPassword);

        const scheduleResponse1 = await request(app)
            .post('/admin/schedules')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
                DoctorId: doctorId,
                DoctorName: 'Dr. Test',
                Date: '2021-12-12',
                StartTime: '09:00',
                EndTime: '10:00'
            });
        scheduleId1 = scheduleResponse1.body.Id;

        const scheduleResponse2 = await request(app)
            .post('/admin/schedules')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
                DoctorId: doctorId,
                DoctorName: 'Dr. Test',
                Date: '2021-12-12',
                StartTime: '10:00',
                EndTime: '11:00'
            });
        scheduleId2 = scheduleResponse2.body.Id;

        const appointmentResponse = await request(app)
            .post('/public/appointments')
            .send({
                ScheduleId: scheduleId1,
                FirstName: 'Test',
                LastName: 'User',
                DateOfBirth: '1990-01-01',
                Email: 'test@test.com'
            });
        appointmentId = appointmentResponse.body.Id;
    });


    it('should list appointments', async () => {
        console.log(doctorToken);
        const response = await request(app)
            .get('/doctor/appointments')
            .set('Authorization', `Bearer ${doctorToken}`)
            .expect(200);
        console.log(response.body);
        expect(response.body.length).toBe(1);
        expect(response.body[0].DoctorId).toBe(doctorId);
        expect(response.body[0].DoctorName).toBe('Dr. Test');
        expect(response.body[0].Date).toBe('2021-12-12');
        expect(response.body[0].StartTime).toBe('09:00');
        expect(response.body[0].EndTime).toBe('10:00');
        expect(response.body[0].FirstName).toBe('Test');
        expect(response.body[0].LastName).toBe('User');
        expect(response.body[0].DateOfBirth).toBe('1990-01-01');
        expect(response.body[0].Email).toBe('test@test.com');
    });

    it('should update appointment', async () => {
        const response = await request(app)
            .put(`/doctor/appointments/${appointmentId}`)
            .set('Authorization', `Bearer ${doctorToken}`)
            .send({FirstName: 'FN', Version: 1})
            .expect(200);
        console.log(response.body);
        expect(response.body.FirstName).toBe('FN');
    });

    it('should reschedule appointment', async () => {
        const response = await request(app)
            .post(`/doctor/appointments/${appointmentId}/reschedule`)
            .set('Authorization', `Bearer ${doctorToken}`)
            .send({ScheduleId: scheduleId2})
            .expect(200);
        expect(response.body.ScheduleId).toBe(scheduleId2);
        expect(response.body.StartTime).toBe('10:00');
        expect(response.body.EndTime).toBe('11:00');
    });

    it('should cancel appointment', async () => {
        const response = await request(app)
            .post(`/doctor/appointments/${appointmentId}/cancel`)
            .set('Authorization', `Bearer ${doctorToken}`)
            .expect(200);
        expect(response.body.Status).toBe('cancelled');
    });

    it('should complete appointment', async () => {
        const response = await request(app)
            .post(`/doctor/appointments/${appointmentId}/complete`)
            .set('Authorization', `Bearer ${doctorToken}`)
            .expect(200);
        expect(response.body.Status).toBe('completed');
    });

    afterAll(async () => {
        await request(app)
            .delete(`/admin/users/${doctorId}`)
            .set('Authorization', `Bearer ${adminToken}`)
            .expect(204);
        await request(app)
            .delete(`/admin/appointments/${appointmentId}`)
            .set('Authorization', `Bearer ${adminToken}`)
            .expect(204);
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