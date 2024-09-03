import express from 'express';
import asyncHandler from '../asyncHandler.js';
import WorkingScheduleService from '../../service/WorkingScheduleService.js';

const router = express.Router();

/**
 * @openapi
 * /admin/schedules:
 *   get:
 *     summary: List working schedules
 *     description: List working schedules
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: doctorId
 *         schema:
 *           type: string
 *         description: Filter by doctor's ID
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by schedule start date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by schedule end date
 *     responses:
 *       200:
 *         description: A list of working schedules
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ScheduleDTO'
 *       500:
 *         description: Internal server error
 */
router.get('/', asyncHandler(async (req, res) => {
  const { doctorId, startDate, endDate } = req.query;
  const result = await WorkingScheduleService.listSchedules({ doctorId, scheduleStartDate: startDate, scheduleEndDate: endDate });
  if (result.success) {
    res.status(200).json(result.data);
  } else {
    res.status(500).json(result.message);
  }
}));

/**
 * @openapi
 * /admin/schedules:
 *   post:
 *     summary: Create a new working schedule
 *     description: Create a new working schedule
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateScheduleDTO'
 *             required:
 *               - DoctorId
 *               - Date
 *               - StartTime
 *               - EndTime
 *     responses:
 *       201:
 *         description: Schedule created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ScheduleDTO'
 *       500:
 *         description: Internal server error
 */
router.post('/', asyncHandler(async (req, res) => {
  const result = await WorkingScheduleService.createSchedule(req.body);
  if (result.success) {
    res.status(201).json(result.data);
  } else {
    res.status(500).json(result.message);
  }
}));

/**
 * @openapi
 * /admin/schedules/{scheduleId}:
 *   put:
 *     summary: Update an existing working schedule
 *     description: Update an existing working schedule
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: scheduleId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the schedule to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateScheduleDTO'
 *     responses:
 *       200:
 *         description: Schedule updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ScheduleDTO'
 *       500:
 *         description: Internal server error
 */
router.put('/:scheduleId', asyncHandler(async (req, res) => {
  const result = await WorkingScheduleService.updateSchedule({ Id: req.params.scheduleId, ...req.body });
  if (result.success) {
    res.status(200).json(result.data);
  } else {
    res.status(500).json(result.message);
  }
}));

/**
 * @openapi
 * /admin/schedules/{scheduleId}:
 *   delete:
 *     summary: Delete an existing working schedule
 *     description: Delete an existing working schedule
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: scheduleId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the schedule to delete
 *     responses:
 *       204:
 *         description: Schedule deleted successfully
 *       500:
 *         description: Internal server error
 */
router.delete('/:scheduleId', asyncHandler(async (req, res) => {
  const result = await WorkingScheduleService.deleteSchedule(req.params.scheduleId);
  if (result.success) {
    res.status(204).json(result.message);
  } else {
    res.status(500).json('Internal server error');
  }
}));

export default router;
