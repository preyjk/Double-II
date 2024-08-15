import express from 'express';
import asyncHandler from './asyncHandler.js';
import AppointmentService from '../service/AppointmentService.js';
import AuthService from '../service/AuthService.js';

const router = express.Router();

router.get('/appointments', asyncHandler(async (req, res) => {
  const { gpId, startDate, endDate } = req.query;
  const result = await AppointmentService.listAppointments({ gpId, appointmentStartDate: startDate, appointmentEndDate: endDate });
  if (result.success) {
    res.status(200).json(result.data);
  } else {
    res.status(500).json(result.message);
  }
}));

router.get('/user/appointments', AuthService.verifyRequest, asyncHandler(async (req, res) => {
  const { gpId, startDate, endDate } = req.query;
  const result = await AppointmentService.listAppointments({ gpId, username: req.auth.username, appointmentStartDate: startDate, appointmentEndDate: endDate });
  if (result.success) {
    res.status(200).json(result.data);
  } else {
    res.status(500).json(result.message);
  }
}));

router.post('/appointments', asyncHandler(async (req, res) => {
  const result = await AppointmentService.createAppointment(req.body);
  if (result.success) {
    res.status(201).json(result.data);
  } else {
    res.status(500).json(result.message);
  }
}));

router.get('/appointments/:appointmentId', asyncHandler(async (req, res) => {
  const result = await AppointmentService.getAppointmentById(req.params.appointmentId);
  if (result.success) {
    res.status(200).json(result.data);
  } else {
    res.status(404).json(result.message);
  }
}));

router.put('/appointments/:appointmentId', asyncHandler(async (req, res) => {
  const result = await AppointmentService.updateAppointment({ id: req.params.appointmentId, ...req.body });
  if (result.success) {
    res.status(200).json(result.data);
  } else {
    res.status(500).json(result.message);
  }
}));

router.delete('/appointments/:appointmentId', asyncHandler(async (req, res) => {
  const result = await AppointmentService.deleteAppointment(req.params.appointmentId);
  if (result.success) {
    res.status(204).json(result.message);
  } else {
    res.status(500).json('Internal server error');
  }
}));

export default router;
