import express from 'express';
import asyncHandler from './asyncHandler.js';
import ClinicService from '../service/ClinicService.js';

const router = express.Router();

router.get('/clinics', asyncHandler(async (req, res) => {
  const result = await ClinicService.listClinics();
  if (result.success) {
    res.status(200).json(result.data);
  } else {
    res.status(500).json(result.message);
  }
}));

export default router;
