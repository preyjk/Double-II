import express from 'express';
import asyncHandler from '../asyncHandler.js';
import WorkingScheduleService from '../../service/WorkingScheduleService.js';

const router = express.Router();

/**
 * @openapi
 * /public/schedules/available-dates:
 *   get:
 *     summary: Get available dates for a doctor
 *     parameters:
 *       - in: query
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the doctor
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: The start date to filter available dates
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: The end date to filter available dates
 *     responses:
 *       200:
 *         description: A list of available dates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 format: date
 *       500:
 *         description: Internal server error
 */
router.get('/available-dates', asyncHandler(async (req, res) => {
  const { doctorId, startDate, endDate } = req.query;
  const result = await WorkingScheduleService.getAvailableDates({ doctorId, startDate, endDate });
  if (result.success) {
    return res.status(200).json(result.data);
  } 
  return res.status(500).json(result.message);
}));

/**
 * @openapi
 * /public/schedules/available-timeslots:
 *   get:
 *     summary: Get available timeslots for a doctor on a specific date
 *     parameters:
 *       - in: query
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the doctor
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: The date to filter available timeslots
 *     responses:
 *       200:
 *         description: A list of available timeslots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   Id:
 *                     type: string
 *                   StartTime:
 *                     type: string
 *                     format: time
 *                   EndTime:
 *                     type: string
 *                     format: time
 *                   Status:
 *                     type: string
 *                     enum:
 *                       - available
 *                       - occupied
 *       500:
 *         description: Internal server error
 */
router.get('/available-timeslots', asyncHandler(async (req, res) => {
  const { doctorId, date } = req.query;
  const result = await WorkingScheduleService.getTimeSlots({ doctorId, date });
  if (result.success) {
    return res.status(200).json(result.data);
  } 
  return res.status(500).json(result.message);
}));

export default router;
