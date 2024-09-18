import express from 'express';

const router = express.Router();

import appointmentRoutes from './AppointmentController.js';
import patientRoutes from './PatientController.js';
import userRoutes from './UserController.js';

router.use('/appointments', appointmentRoutes);
router.use('/patients', patientRoutes);
router.use('/', userRoutes);

export default router;