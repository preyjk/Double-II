import express from 'express';

const router = express.Router();

import appointmentRoutes from './AppointmentController.js';
import patientRoutes from './PatientController.js';

router.use('/appointments', appointmentRoutes);
router.use('/patients', patientRoutes);

export default router;