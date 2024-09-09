import express from 'express';

const router = express.Router();

import appointmentRoutes from './AppointmentController.js';

router.use('/appointments', appointmentRoutes);

export default router;