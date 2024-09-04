import express from 'express';

const router = express.Router();

import appointmentRoutes from './AppointmentController.js';
import workingScheduleRoutes from './WorkingScheduleController.js';
import doctorRoutes from './DoctorController.js';
import userRoutes from './UserController.js';

router.use('/appointments', appointmentRoutes);
router.use('/schedules', workingScheduleRoutes);
router.use('/doctors', doctorRoutes);
router.use('/users', userRoutes);

export default router;