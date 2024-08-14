import express from 'express';
import appointmentRoutes from '../controller/AppointmentController.js';
import authRoutes from '../controller/AuthController.js';
import clinicRoutes from '../controller/ClinicController.js';
import doctorRoutes from '../controller/DoctorController.js';
import patientRoutes from '../controller/PatientController.js';
import chatbotRoutes from '../controller/ChatbotController.js';
import userRoutes from '../controller/UserController.js';
import AuthService from '../service/AuthService.js';

const router = express.Router();

router.use('/', appointmentRoutes);
router.use('/', authRoutes);
router.use('/', clinicRoutes);
router.use('/', doctorRoutes);
router.use('/', chatbotRoutes);
router.use('/user', AuthService.verifyRequest, patientRoutes);
router.use('/admin', AuthService.verifyRequest, userRoutes);

export default router;
