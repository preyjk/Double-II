import express from 'express';
import asyncHandler from '../asyncHandler.js';
import DoctorService from '../../service/DoctorService.js';

const router = express.Router();

/**
 * @openapi
 * /public/doctors:
 *   get:
 *     summary: List doctors
 *     description: List doctors
 *     parameters:
 *       - in: query
 *         name: firstname
 *         schema:
 *           type: string
 *         description: Filter by doctor's first name
 *       - in: query
 *         name: lastname
 *         schema:
 *           type: string
 *         description: Filter by doctor's last name
 *       - in: query
 *         name: workplace
 *         schema:
 *           type: string
 *         description: Filter by doctor's workplace
 *     responses:
 *       200:
 *         description: A list of doctors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DoctorDTO'
 *       500:
 *         description: Internal server error
 */
router.get('/', asyncHandler(async (req, res) => {
  const { firstname, lastname, workplace } = req.query;
  const result = await DoctorService.listDoctors({ firstname, lastname, workplace });
  return res.status(200).json(result.data);
}));

export default router;
