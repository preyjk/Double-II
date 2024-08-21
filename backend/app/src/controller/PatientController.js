import express from 'express';
import asyncHandler from './asyncHandler.js';
import PatientService from '../service/PatientService.js';

const router = express.Router();

router.get('/patients', asyncHandler(async (req, res) => {
  const result = await PatientService.getPatientByUserId(req.auth.id);
  return res.status(200).json(result.data);
}));

router.post('/patients', asyncHandler(async (req, res) => {
  const patientData = { ...req.body, UserId: req.auth.id };
  const result = await PatientService.createPatient(patientData);
  return res.status(201).json(result.data);
}));

router.get('/patients/:patientId', asyncHandler(async (req, res) => {
  const { patientId } = req.params;

  // Fetch the patient record first
  const result = await PatientService.getPatientById(patientId);

  if (result.success && result.data.UserId === req.auth.id) {
    return res.status(200).json(result.data);
  } else {
    return res.status(404).json('Patient not found');
  }
}));

router.put('/patients/:patientId', asyncHandler(async (req, res) => {
  try {
  const { patientId } = req.params;

  const patientData = { Id: patientId, UserId: req.auth.id, ...req.body };
  const result = await PatientService.updatePatient(patientData);

  return res.status(200).json(result.data);
  } catch (error) {
    if (error.name === 'ConditionalCheckFailedException') {
      return res.status(404).json('Patient not found');
    }
    throw error;
  }
}));

router.delete('/patients/:patientId', asyncHandler(async (req, res) => {
  const { patientId } = req.params;

  const patientToBeDeleted = await PatientService.getPatientById(patientId);

  if (patientToBeDeleted.data?.UserId !== req.auth.id) {
    return res.status(404).json('Patient not found');
  }

  const result = await PatientService.deletePatient(patientId);

  return res.status(204).json(result.message);
}));

export default router;
