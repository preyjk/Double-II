import express from 'express';
import asyncHandler from './asyncHandler.js';
import AppointmentService from '../service/AppointmentService.js';
import AuthService from '../service/AuthService.js';

const router = express.Router();

router.get('/appointments',
  AuthService.verifyRequest,
  AuthService.hasRole(['admin']),
  asyncHandler(async (req, res) => {
    const { doctorId, startDate, endDate } = req.query;
    const result = await AppointmentService.listAppointments({
      doctorId,
      appointmentStartDate: startDate,
      appointmentEndDate: endDate
    });
    if (result.success) {
      return res.status(200).json(result.data);
    }
    return res.status(500).json(result.message);
  }));

router.get('/appointment',
  asyncHandler(async (req, res) => {
    const { reference, lastname, dob } = req.query;
    const result = await AppointmentService.getAppointmentByBookingReference({
      BookingReference: reference,
      LastName: lastname,
      DateOfBirth: dob
    });
    if (result.success) {
      return res.status(200).json(result.data);
    }
    return res.status(500).json(result.message);
  }));

router.get('/user/appointments',
  AuthService.verifyRequest,
  asyncHandler(async (req, res) => {
    const { doctorId, startDate, endDate } = req.query;
    const result = await AppointmentService.listAppointments({
      doctorId,
      userId: req.auth.id,
      appointmentStartDate: startDate,
      appointmentEndDate: endDate
    });
    if (result.success) {
      return res.status(200).json(result.data);
    }
    return res.status(500).json(result.message);
  }));

router.post('/appointments',
  asyncHandler(async (req, res) => {
    const result = await AppointmentService.createAppointment(req.body);
    if (result.success) {
      return res.status(201).json(result.data);
    }
    return res.status(400).json(result.message);
  }));

router.post('/user/appointments',
  AuthService.verifyRequest,
  asyncHandler(async (req, res) => {
    const result = await AppointmentService.createAppointment({ ...req.body, UserId: req.auth.id });
    if (result.success) {
      return res.status(201).json(result.data);
    }
    return res.status(400).json(result.message);
  }));

router.get('/appointments/:appointmentId',
  AuthService.verifyRequest,
  asyncHandler(async (req, res) => {
    const result = await AppointmentService.getAppointmentById(req.params.appointmentId);
    if (!result.success) {
      return res.status(404).json(result.message);
    }
    if (result.data.UserId == req.auth.id || req.auth.roles.includes('admin')) {
      return res.status(200).json(result.data);
    }
    return res.status(403).json('Forbidden');
  }));

router.put('/appointments/:appointmentId',
  AuthService.verifyRequest,
  asyncHandler(async (req, res) => {
    const oldAppointment = await AppointmentService.getAppointmentById(req.params.appointmentId);
    if (!oldAppointment.success) {
      return res.status(404).json(oldAppointment.message);
    }
    if (oldAppointment.data.UserId !== req.auth.id && !req.auth.roles.includes('admin')) {
      return res.status(403).json('Forbidden');
    }
    const result = await AppointmentService.updateAppointment({ Id: req.params.appointmentId, ...req.body });
    if (result.success) {
      return res.status(200).json(result.data);
    }
    return res.status(500).json(result.message);
  }));

router.post('/appointments/reschedule', 
  asyncHandler(async (req, res) => {  
    const { BookingReference, LastName, DateOfBirth, ScheduleId } = req.body;
    const result = await AppointmentService.getAppointmentByBookingReference({
      BookingReference,
      LastName,
      DateOfBirth
    });
    if (result.success) {
      const appointment = result.data;
      const rescheduleResult = await AppointmentService.rescheduleAppointment({
        appointmentId: appointment.Id,
        newScheduleId: ScheduleId
      });
      if (rescheduleResult.success) {
        return res.status(200).json(rescheduleResult.data);
      }
    }
    return res.status(500).json(rescheduleResult.message);
  }));

router.post('/appointments/:appointmentId/reschedule',
  AuthService.verifyRequest,
  asyncHandler(async (req, res) => {
    const appointment = await AppointmentService.getAppointmentById(req.params.appointmentId);
    if (!appointment.success) {
      return res.status(404).json(appointment.message);
    }
    if (appointment.data.UserId !== req.auth.id && !req.auth.roles.includes('admin')) {
      return res.status(403).json('Forbidden');
    }
    const result = await AppointmentService.rescheduleAppointment({
      appointmentId: req.params.appointmentId,
      newScheduleId: req.body.ScheduleId
    });
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(500).json(result.message);
    }
  }));

router.post('/user/appointments/link', AuthService.verifyRequest,
  asyncHandler(async (req, res) => {
    const { BookingReference, LastName, DateOfBirth } = req.body;
    const result = await AppointmentService.getAppointmentByBookingReference({
      BookingReference,
      LastName,
      DateOfBirth
    });
    if (result.success) {
      const appointment = result.data;
      if (appointment.UserId) {
        return res.status(400).json('The appointment is already linked to a user');
      }
      const updateResult = await AppointmentService.updateAppointment({
        Id: appointment.Id,
        UserId: req.auth.id,
        Version: appointment.Version,
      });
      if (updateResult.success) {
        return res.status(200).json(updateResult.data);
      }
    }
    return res.status(500).json(updateResult.message);
  }));

router.delete('/appointments/:appointmentId',
  AuthService.verifyRequest,
  AuthService.hasRole(['admin']),
  asyncHandler(async (req, res) => {
    const result = await AppointmentService.deleteAppointment(req.params.appointmentId);
    if (result.success) {
      res.status(204).json(result.message);
    } else {
      res.status(500).json('Internal server error');
    }
  }));

router.post('/appointments/:appointmentId/cancel',
  AuthService.verifyRequest,
  asyncHandler(async (req, res) => {
    const appointment = await AppointmentService.getAppointmentById(req.params.appointmentId);
    if (!appointment.success) {
      return res.status(404).json(appointment.message);
    }
    if (appointment.data.UserId !== req.auth.id && !req.auth.roles.includes('admin')) {
      return res.status(403).json('Forbidden');
    }
    const result = await AppointmentService.cancelAppointment(appointment.data);
    if (result.success) {
      return res.status(200).json(result.data);
    }
    return res.status(500).json(result.message);
  }));

router.post('/appointments/cancel',
  asyncHandler(async (req, res) => {
    const { BookingReference, LastName, DateOfBirth } = req.body;
    const result = await AppointmentService.getAppointmentByBookingReference({
      BookingReference,
      LastName,
      DateOfBirth
    });
    if (result.success) {
      if (result.data.UserId) {
        return res.status(400).json('The appointment is linked to a user, please login to cancel');
      }
      const cancelResult = await AppointmentService.cancelAppointment(result.data);
      if (cancelResult.success) {
        return res.status(200).json(cancelResult.data);
      }
    }
    return res.status(500).json(cancelResult.message);
  }));

router.post('/appointments/:appointmentId/complete',
  AuthService.verifyRequest,
  AuthService.hasRole(['admin']),
  asyncHandler(async (req, res) => {
    const appointment = await AppointmentService.getAppointmentById(req.params.appointmentId);
    if (!appointment.success) {
      return res.status(404).json(appointment.message);
    }
    const result = await AppointmentService.completeAppointment(appointment.data);
    if (result.success) {
      return res.status(200).json(result.data);
    }
    return res.status(500).json(result.message);
  }));

export default router;
