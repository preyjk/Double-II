import express from 'express';
import asyncHandler from './asyncHandler.js';
import DoctorService from '../service/DoctorService.js';

const router = express.Router();

router.get('/doctors', asyncHandler(async (req, res) => {
  const { workplace } = req.query;
  let result;

  if (workplace) {
    result = await DoctorService.listDoctorsByWorkplace(workplace);
  } else {
    result = await DoctorService.listDoctors();
  }
  return res.status(200).json(result.data);
}));

router.post('/doctors', asyncHandler(async (req, res) => {
  const result = await DoctorService.createDoctor(req.body);
  return res.status(201).json(result.data);
}));

router.get('/doctors/:doctorId', asyncHandler(async (req, res) => {
  const result = await DoctorService.getDoctorById(req.params.doctorId);
  if (result.success) {
    return res.status(200).json(result.data);
  } else {
    return res.status(404).json(result.message);
  }
}));

router.put('/doctors/:doctorId', asyncHandler(async (req, res) => {
  const result = await DoctorService.updateDoctor({ id: req.params.doctorId, ...req.body });
  return res.status(200).json(result.data);
}));

router.delete('/doctors/:doctorId', asyncHandler(async (req, res) => {
  const result = await DoctorService.deleteDoctor(req.params.doctorId);
  return res.status(204).json(result.message);
}));

export default router;
