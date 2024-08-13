import express from 'express';
import PatientService from '../service/PatientService.js';

const router = express.Router();

router.get('/patients', async (req, res) => {
  try {
    const { username } = req.auth;
    const result = await PatientService.getPatientByUsername(username);
    return res.status(200).json(result.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json('Internal server error');
  }
});

router.post('/patients', async (req, res) => {
  try {
    const username = req.auth.username;
    const patientData = { ...req.body, username };
    const result = await PatientService.createPatient(patientData);
    return res.status(201).json(result.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json('Internal server error');
  }
});

router.get('/patients/:patientId', async (req, res) => {
  try {
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
  } catch (error) {
    console.error(error);
    return res.status(500).json('Internal server error');
  }
});

router.put('/patients/:patientId', async (req, res) => {
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
    console.error(error);
    return res.status(500).json('Internal server error');
  }
});

router.delete('/patients/:patientId', async (req, res) => {
  try {
    const { patientId } = req.params;
    const username = req.auth.username;

    const patientToBeDeleted = await PatientService.getPatientById(patientId);

    // Ensure the username in the request body matches the authenticated user
    if (patientToBeDeleted.data?.username !== username) {
      return res.status(404).json('Patient not found');
    }

    const result = await PatientService.deletePatient(patientId);

    return res.status(204).json(result.message);
  } catch (error) {
    console.error(error);
    return res.status(500).json('Internal server error');
  }
});

export default router;
