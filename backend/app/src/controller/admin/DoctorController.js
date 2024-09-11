import express from 'express';
import asyncHandler from '../asyncHandler.js';
import DoctorService from '../../service/DoctorService.js';

const router = express.Router();

/**
 * @openapi
 * /admin/doctors:
 *   post:
 *     summary: Create a new doctor
 *     description: Create a new doctor
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDoctorDTO'
 *     responses:
 *       201:
 *         description: Doctor created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DoctorDTO'
 *       500:
 *         description: Internal server error
 */
router.post('/', asyncHandler(async (req, res) => {
  const result = await DoctorService.createDoctor(req.body);
  return res.status(201).json(result.data);
}));

/**
 * @openapi
 * /admin/doctors/{doctorId}:
 *   get:
 *     summary: Get a doctor by ID
 *     description: Get a doctor by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the doctor to retrieve
 *     responses:
 *       200:
 *         description: Doctor retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DoctorDTO'
 *       404:
 *         description: Doctor not found
 *       500:
 *         description: Internal server error
 */
router.get('/:doctorId', asyncHandler(async (req, res) => {
  const result = await DoctorService.getDoctorById(req.params.doctorId);
  if (result.success) {
    return res.status(200).json(result.data);
  } else {
    return res.status(404).json(result.message);
  }
}));

/**
 * @openapi
 * /admin/doctors/{doctorId}:
 *   put:
 *     summary: Update a doctor by ID
 *     description: Update a doctor by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the doctor to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateDoctorDTO'
 *     responses:
 *       200:
 *         description: Doctor updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DoctorDTO'
 *       500:
 *         description: Internal server error
 */
router.put('/:doctorId', asyncHandler(async (req, res) => {
  const result = await DoctorService.updateDoctor({ Id: req.params.doctorId, ...req.body });
  return res.status(200).json(result.data);
}));

/**
 * @openapi
 * /admin/doctors/{doctorId}:
 *   delete:
 *     summary: Delete a doctor by ID
 *     description: Delete a doctor by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the doctor to delete
 *     responses:
 *       204:
 *         description: Doctor deleted successfully
 *       500:
 *         description: Internal server error
 */
router.delete('/:doctorId', asyncHandler(async (req, res) => {
  const result = await DoctorService.deleteDoctor(req.params.doctorId);
  return res.status(204).json(result.message);
}));

export default router;
