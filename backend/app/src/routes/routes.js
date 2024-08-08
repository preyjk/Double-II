import express from 'express';
import appointmentRoutes from '../controller/AppointmentController.js';
import authRoutes from '../controller/AuthController.js';
import clinicRoutes from '../controller/ClinicController.js';
import doctorRoutes from '../controller/DoctorController.js';

const router = express.Router();

router.use('/', appointmentRoutes);
router.use('/', authRoutes);
router.use('/', clinicRoutes);
router.use('/', doctorRoutes);

export default router;
