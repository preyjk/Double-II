import express from 'express';
import AppointmentService from '../service/AppointmentService.js';

const router = express.Router();

router.get('/appointments', async (req, res) => {
  try {
    const result = await AppointmentService.listAppointments();
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(500).json(result.message);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal server error');
  }
});

router.post('/appointments', async (req, res) => {
  try {
    const result = await AppointmentService.createAppointment(req.body);
    if (result.success) {
      res.status(201).json(result.data);
    } else {
      res.status(500).json(result.message);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal server error');
  }
});

router.get('/appointments/:appointmentId', async (req, res) => {
  try {
    const result = await AppointmentService.getAppointmentById(req.params.appointmentId);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result.message);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal server error');
  }
});

router.put('/appointments/:appointmentId', async (req, res) => {
  try {
    const result = await AppointmentService.updateAppointment({ id: req.params.appointmentId, ...req.body });
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(500).json(result.message);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal server error');
  }
});

router.delete('/appointments/:appointmentId', async (req, res) => {
  try {
    const result = await AppointmentService.deleteAppointment(req.params.appointmentId);
    if (result.success) {
      res.status(204).json(result.message);
    } else {
      res.status(500).json('Internal server error');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal server error');
  }
});

export default router;
