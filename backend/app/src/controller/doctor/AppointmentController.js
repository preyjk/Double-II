import express from 'express';
import asyncHandler from '../asyncHandler.js';
import AppointmentService from '../../service/AppointmentService.js';

const router = express.Router();

/**
 * @openapi
 * /doctor/appointments:
 *   get:
 *     summary: List appointments
 *     description: List appointments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *         required: false
 *         description: The start date of the appointment
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *         required: false
 *         description: The end date of the appointment
 *     responses:
 *       '200':
 *          description: return a list of appointments based on the query
 *       '500':
 *          description: Internal server error
 */
router.get('/', asyncHandler(async (req, res) => {
  const { doctorId, startDate, endDate } = req.query;
  const result = await AppointmentService.listAppointments({
    doctorId: req.auth.id,
    appointmentStartDate: startDate,
    appointmentEndDate: endDate
  });
  if (result.success) {
    return res.status(200).json(result.data);
  }
  return res.status(500).json(result.message);
}));

/**
 * @openapi
 * /doctor/appointments/{appointmentId}:
 *   get:
 *     summary: Get an appointment by ID
 *     description: Get an appointment by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The appointment ID
 *     responses:
 *       '200':
 *          description: return the appointment
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/AppointmentDTO'
 *       '404':
 *          description: Not found
 *       '403':
 *          description: Forbidden
 */
router.get('/:appointmentId', asyncHandler(async (req, res) => {
  const result = await AppointmentService.getAppointmentById(req.params.appointmentId);
  if (!result.success) {
    return res.status(404).json(result.message);
  }
  if (result.data.DoctorId == req.auth.id) {
    return res.status(200).json(result.data);
  }
  return res.status(403).json('Forbidden');
}));

/**
 * @openapi
 * /doctor/appointments/{appointmentId}:
 *   put:
 *     summary: Update an appointment
 *     description: Update an appointment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The appointment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAppointmentDTO'
 *     responses:
 *       '200':
 *          description: return the updated appointment
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/AppointmentDTO'
 *       '404':
 *          description: Not found
 *       '403':
 *          description: Forbidden
 *       '500':
 *          description: Internal server error
 */
router.put('/:appointmentId', asyncHandler(async (req, res) => {
  const oldAppointment = await AppointmentService.getAppointmentById(req.params.appointmentId);
  if (!oldAppointment.success) {
    return res.status(404).json(oldAppointment.message);
  }
  if (oldAppointment.data.DoctorId !== req.auth.id) {
    return res.status(403).json('Forbidden');
  }
  const result = await AppointmentService.updateAppointment({ Id: req.params.appointmentId, ...req.body });
  if (result.success) {
    return res.status(200).json(result.data);
  }
  return res.status(500).json(result.message);
}));

/**
 * @openapi
 * /doctor/appointments/{appointmentId}/reschedule:
 *   post:
 *     summary: Reschedule an appointment
 *     description: Reschedule an appointment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The appointment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ScheduleId
 *             properties:
 *               ScheduleId:
 *                 type: string
 *     responses:
 *       '200':
 *          description: Appointment rescheduled successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/AppointmentDTO'
 *       '404':
 *          description: Not found
 *       '403':
 *          description: Forbidden
 *       '500':
 *          description: Internal server error
 */
router.post('/:appointmentId/reschedule', asyncHandler(async (req, res) => {
  const appointment = await AppointmentService.getAppointmentById(req.params.appointmentId);
  if (!appointment.success) {
    return res.status(404).json(appointment.message);
  }
  if (appointment.data.DoctorId !== req.auth.id) {
    return res.status(403).json('Forbidden');
  }
  const result = await AppointmentService.rescheduleAppointment({
    appointmentId: req.params.appointmentId,
    newScheduleId: req.body.ScheduleId
  });
  if (result.success) {
    res.status(200).json(result.data);
  } else {
    res.status(500).json(result.message);
  }
}));

/**
 * @openapi
 * /doctor/appointments/{appointmentId}/cancel:
 *   post:
 *     summary: Cancel an appointment
 *     description: Cancel an appointment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The appointment ID
 *     responses:
 *       '200':
 *          description: return the cancelled appointment
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/AppointmentDTO'
 *       '404':
 *          description: Not found
 *       '403':
 *          description: Forbidden
 *       '500':
 *          description: Internal server error
 */
router.post('/:appointmentId/cancel', asyncHandler(async (req, res) => {
  const appointment = await AppointmentService.getAppointmentById(req.params.appointmentId);
  if (!appointment.success) { 
    return res.status(404).json(appointment.message);
  }
  if (appointment.data.DoctorId !== req.auth.id) {
    return res.status(403).json('Forbidden');
  }
  const result = await AppointmentService.cancelAppointment(appointment.data);
  if (result.success) {
    return res.status(200).json(result.data);
  }
  return res.status(500).json(result.message);
}));

/**
 * @openapi
 * /doctor/appointments/{appointmentId}/complete:
 *   post:
 *     summary: Complete an appointment
 *     description: Complete an appointment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The appointment ID
 *     responses:
 *       '200':
 *          description: return the completed appointment
 *       '404':
 *          description: Not found
 *       '403':
 *          description: Forbidden
 *       '500':
 *          description: Internal server error
 */
router.post('/:appointmentId/complete', asyncHandler(async (req, res) => {
    const appointment = await AppointmentService.getAppointmentById(req.params.appointmentId);
    if (!appointment.success) {
        return res.status(404).json(appointment.message);
    }
    if (appointment.data.DoctorId !== req.auth.id) {
        return res.status(403).json('Forbidden');
    }
    const result = await AppointmentService.completeAppointment(appointment.data);
    if (result.success) {
        return res.status(200).json(result.data);
    }
    return res.status(500).json(result.message);
}));

export default router;