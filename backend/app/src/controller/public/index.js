import express from 'express';

const router = express.Router();

import appointmentRoutes from './AppointmentController.js';
import clinicRoutes from './ClinicController.js';
import authRoutes from './AuthController.js';
import chatbotRoutes from './ChatbotController.js';
import workingScheduleRoutes from './WorkingScheduleController.js';
import doctorRoutes from './DoctorController.js';

router.use('/appointments', appointmentRoutes);
router.use('/clinics', clinicRoutes);
router.use('/auth', authRoutes);
router.use('/chatbot', chatbotRoutes);
router.use('/schedules', workingScheduleRoutes);
router.use('/doctors', doctorRoutes);

export default router;