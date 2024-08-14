import express from 'express';
import asyncHandler from './asyncHandler.js';
import PatientService from '../service/PatientService.js';

const router = express.Router();

router.get('/patients', asyncHandler(async (req, res) => {
  const { username } = req.auth;
  const result = await PatientService.getPatientByUsername(username);
  return res.status(200).json(result.data);
}));

router.post('/patients', asyncHandler(async (req, res) => {
  const username = req.auth.username;
  const patientData = { ...req.body, username };
  const result = await PatientService.createPatient(patientData);
  return res.status(201).json(result.data);
}));

router.get('/patients/:patientId', asyncHandler(async (req, res) => {
  const { patientId } = req.params;
  const username = req.auth.username;

  // Fetch the patient record first
  const result = await PatientService.getPatientById(patientId);

  // Check if the username matches
  if (result.success && result.data.username === username) {
    return res.status(200).json(result.data);
  } else {
    return res.status(404).json('Patient not found');
  }
}));

router.put('/patients/:patientId', asyncHandler(async (req, res) => {
  try {
  const { patientId } = req.params;
  const username = req.auth.username;

  // Ensure the username in the request body matches the authenticated user
  if (req.body.username !== username) {
    return res.status(404).json('Patient not found');
  }

  const patientData = { id: patientId, ...req.body };
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
  const username = req.auth.username;

  const patientToBeDeleted = await PatientService.getPatientById(patientId);

  // Ensure the username in the request body matches the authenticated user
  if (patientToBeDeleted.data?.username !== username) {
    return res.status(404).json('Patient not found');
  }

  const result = await PatientService.deletePatient(patientId);

  return res.status(204).json(result.message);
}));

export default router;
