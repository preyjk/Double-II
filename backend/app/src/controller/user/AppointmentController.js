import express from 'express';
import asyncHandler from '../asyncHandler.js';
import AppointmentService from '../../service/AppointmentService.js';

const router = express.Router();

/**
 * @openapi
 * /user/appointments:
 *   get:
 *     summary: List appointments
 *     description: List appointments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: doctorId
 *         schema:
 *           type: string
 *         required: false
 *         description: The doctor ID
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
    doctorId,
    userId: req.auth.id,
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
 * /user/appointments:
 *   post:
 *     summary: Create a new appointment
 *     description: Create a new appointment
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateAppointmentDTO'
 *            required:
 *              - ScheduleId
 *              - LastName
 *              - DateOfBirth
 *              - Email
 *     responses:
 *       '201':
 *          description: return the created appointment
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/AppointmentDTO'
 *       '400':
 *          description: Bad request
 */
router.post('/', asyncHandler(async (req, res) => {
  const result = await AppointmentService.createAppointment({ ...req.body, UserId: req.auth.id });
  if (result.success) {
    return res.status(201).json(result.data);
  }
  return res.status(400).json(result.message);
}));

/**
 * @openapi
 * /user/appointments/{appointmentId}:
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
  if (result.data.UserId == req.auth.id || req.auth.roles.includes('admin')) {
    return res.status(200).json(result.data);
  }
  return res.status(403).json('Forbidden');
}));

/**
 * @openapi
 * /user/appointments/{appointmentId}:
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
 *             $ref: '#/components/schemas/UpdateAppointmentDTO'
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
  if (oldAppointment.data.UserId !== req.auth.id && !req.auth.roles.includes('admin')) {
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
 * /user/appointments/{appointmentId}/reschedule:
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
 *       '400':
 *          description: The appointment is linked to a user, please login to reschedule
 *       '500':
 *          description: Internal server error
 */
router.post('/:appointmentId/reschedule', asyncHandler(async (req, res) => {
  const appointment = await AppointmentService.getAppointmentById(req.params.appointmentId);
  if (!appointment.success) {
    return res.status(404).json(appointment.message);
  }
  if (appointment.data.UserId !== req.auth.id && !req.auth.roles.includes('admin')) {
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
 * /user/appointments/{appointmentId}/cancel:
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
  if (appointment.data.UserId !== req.auth.id && !req.auth.roles.includes('admin')) {
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
 * /user/appointments/link:
 *   post:
 *     summary: Link an appointment to a user
 *     description: Link an appointment to a user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - BookingReference
 *               - LastName
 *               - DateOfBirth
 *             properties:
 *               BookingReference:
 *                 type: string
 *                 description: The booking reference of the appointment
 *               LastName:
 *                 type: string
 *                 description: The last name of the patient
 *               DateOfBirth:
 *                 type: string
 *                 description: The date of birth of the patient
 *     responses:
 *       '200':
 *          description: return the linked appointment
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/AppointmentDTO'
 *       '400':
 *          description: The appointment is already linked to a user
 *       '500':
 *          description: Internal server error
 */
router.post('/link', asyncHandler(async (req, res) => {
  const { BookingReference, LastName, DateOfBirth } = req.body;
  const result = await AppointmentService.getAppointmentByBookingReference({
    BookingReference,
    LastName,
    DateOfBirth
  });
  if (result.success) {
    const appointment = result.data;
    if (appointment.UserId) {
      return res.status(400).json('The appointment is already linked to a user');
    }
    const updateResult = await AppointmentService.updateAppointment({
      Id: appointment.Id,
      UserId: req.auth.id,
      Version: appointment.Version,
    });
    if (updateResult.success) {
      return res.status(200).json(updateResult.data);
    }
  }
  return res.status(500).json(updateResult.message);
}));

export default router;