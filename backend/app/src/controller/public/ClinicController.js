import express from 'express';
import asyncHandler from '../asyncHandler.js';
import ClinicService from '../../service/ClinicService.js';

const router = express.Router();

/** 
 * @openapi
 * /public/clinics:
 *   get:
 *     summary: List all clinics
 *     description: List all clinics
 *     responses:
 *       '200':
 *         description: A list of clinics
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   workplace:
 *                     type: string
 *                   address:
 *                     type: string
 *       '500':
 *         description: Internal server error
 */
router.get('/', asyncHandler(async (req, res) => {
  const result = await ClinicService.listClinics();
  if (result.success) {
    res.status(200).json(result.data);
  } else {
    res.status(500).json(result.message);
  }
}));

export default router;
