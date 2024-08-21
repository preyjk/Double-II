import express from 'express';
import asyncHandler from './asyncHandler.js';
import WorkingScheduleService from '../service/WorkingScheduleService.js';
import AuthService from '../service/AuthService.js';

const router = express.Router();

router.get('/schedules', asyncHandler(async (req, res) => {
  const { doctorId, startDate, endDate } = req.query;
  const result = await WorkingScheduleService.listSchedules({ doctorId, scheduleStartDate: startDate, scheduleEndDate: endDate });
  if (result.success) {
    res.status(200).json(result.data);
  } else {
    res.status(500).json(result.message);
  }
}));

router.post('/schedules', AuthService.verifyRequest, AuthService.hasRole(['admin']), asyncHandler(async (req, res) => {
  const result = await WorkingScheduleService.createSchedule(req.body);
  if (result.success) {
    res.status(201).json(result.data);
  } else {
    res.status(500).json(result.message);
  }
}));

router.put('/schedules/:scheduleId', AuthService.verifyRequest, AuthService.hasRole(['admin']), asyncHandler(async (req, res) => {
  const result = await WorkingScheduleService.updateSchedule({ Id: req.params.scheduleId, ...req.body });
  if (result.success) {
    res.status(200).json(result.data);
  } else {
    res.status(500).json(result.message);
  }
}));

router.delete('/schedules/:scheduleId', AuthService.verifyRequest, AuthService.hasRole(['admin']), asyncHandler(async (req, res) => {
  const result = await WorkingScheduleService.deleteSchedule(req.params.scheduleId);
  if (result.success) {
    res.status(204).json(result.message);
  } else {
    res.status(500).json('Internal server error');
  }
}));

export default router;
