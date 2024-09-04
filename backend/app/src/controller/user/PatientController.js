import express from 'express';
import asyncHandler from '../asyncHandler.js';
import PatientService from '../../service/PatientService.js';

const router = express.Router();

/**
 * @openapi
 * /user/patients:
 *   get:
 *     summary: Get patient details by user ID
 *     description: Get patient details by user ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Patient details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PatientDTO'
 *       404:
 *         description: Patient not found
 */
router.get('/', asyncHandler(async (req, res) => {
  const result = await PatientService.getPatientByUserId(req.auth.id);
  return res.status(200).json(result.data);
}));

/**
 * @openapi
 * /user/patients:
 *   post:
 *     summary: Create a new patient record
 *     description: Create a new patient record
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePatientDTO'
 *     responses:
 *       201:
 *         description: Patient record created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PatientDTO'
 *       400:
 *         description: Bad request
 */
router.post('/', asyncHandler(async (req, res) => {
  const patientData = { ...req.body, UserId: req.auth.id };
  const result = await PatientService.createPatient(patientData);
  return res.status(201).json(result.data);
}));

/**
 * @openapi
 * /user/patients/{patientId}:
 *   get:
 *     summary: Get patient details by patient ID
 *     description: Get patient details by patient ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the patient to retrieve
 *     responses:
 *       200:
 *         description: Patient details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PatientDTO' 
 *       404:
 *         description: Patient not found
 */
router.get('/:patientId', asyncHandler(async (req, res) => {
  const { patientId } = req.params;

  // Fetch the patient record first
  const result = await PatientService.getPatientById(patientId);

  if (result.success && result.data.UserId === req.auth.id) {
    return res.status(200).json(result.data);
  } else {
    return res.status(404).json('Patient not found');
  }
}));

/**
 * @openapi
 * /user/patients/{patientId}:
 *   put:
 *     summary: Update patient details by patient ID
 *     description: Update patient details by patient ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the patient to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePatientDTO'
 *     responses:
 *       200:
 *         description: Patient details updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PatientDTO'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Patient not found
 */
router.put('/:patientId', asyncHandler(async (req, res) => {
  try {
    const { patientId } = req.params;

    const patientData = { Id: patientId, UserId: req.auth.id, ...req.body };
    const result = await PatientService.updatePatient(patientData);

    return res.status(200).json(result.data);
  } catch (error) {
    if (error.name === 'ConditionalCheckFailedException') {
      return res.status(404).json('Patient not found');
    } else {
      return res.status(400).json('Bad request');
    }
  }
}));

/**
 * @openapi
 * /user/patients/{patientId}:
 *   delete:
 *     summary: Delete patient by patient ID
 *     description: Delete patient by patient ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the patient to delete
 *     responses:
 *       204:
 *         description: Patient deleted successfully
 *       404:
 *         description: Patient not found
 */
router.delete('/:patientId', asyncHandler(async (req, res) => {
  const { patientId } = req.params;

  const patientToBeDeleted = await PatientService.getPatientById(patientId);

  if (patientToBeDeleted.data?.UserId !== req.auth.id) {
    return res.status(404).json('Patient not found');
  }

  const result = await PatientService.deletePatient(patientId);

  return res.status(204).json(result.message);
}));

export default router;
