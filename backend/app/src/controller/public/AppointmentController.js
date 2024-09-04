import express from 'express';
import asyncHandler from '../asyncHandler.js';
import AppointmentService from '../../service/AppointmentService.js';

const router = express.Router();

/**
 * @openapi
 * /public/appointments:
 *   get:
 *     summary: Get an appointment by booking reference, last name, and date of birth
 *     description: Get an appointment by booking reference, last name, and date of birth
 *     parameters:
 *       - in: query
 *         name: reference
 *         schema:
 *           type: string
 *         required: false
 *         description: The booking reference
 *       - in: query
 *         name: lastname
 *         schema:
 *           type: string
 *         required: false
 *         description: The last name of the patient
 *       - in: query
 *         name: dob
 *         schema:
 *           type: string
 *         required: false
 *         description: The date of birth of the patient
 *     responses:
 *       '200':
 *          description: return a list of appointments based on the query
 *       '500':
 *          description: Internal server error
 */
router.get('/', asyncHandler(async (req, res) => {
    const { reference, lastname, dob } = req.query;
    const result = await AppointmentService.getAppointmentByBookingReference({
        BookingReference: reference,
        LastName: lastname,
        DateOfBirth: dob
    });
    if (result.success) {
        return res.status(200).json(result.data);
    }
    return res.status(500).json(result.message);
}));

/**
 * @openapi
 * /public/appointments:
 *   post:
 *     summary: Create a new appointment
 *     description: Create a new appointment
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
 *       '400':
 *          description: Bad request
 */
router.post('/', asyncHandler(async (req, res) => {
    const result = await AppointmentService.createAppointment(req.body);
    if (result.success) {
        return res.status(201).json(result.data);
    }
    return res.status(400).json(result.message);
}));

/**
 * @openapi
 * /public/appointments/reschedule:
 *   post:
 *     summary: Reschedule an existing appointment
 *     description: Reschedule an existing appointment
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
 *               - ScheduleId
 *             properties:
 *               BookingReference:
 *                 type: string
 *               LastName:
 *                 type: string
 *               DateOfBirth:
 *                 type: string
 *                 format: date
 *               ScheduleId:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Appointment rescheduled successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       '400':
 *         description: The appointment is linked to a user, please login to reschedule
 *       '500':
 *         description: Internal server error
 */
router.post('/reschedule', asyncHandler(async (req, res) => {
    const { BookingReference, LastName, DateOfBirth, ScheduleId } = req.body;
    const result = await AppointmentService.getAppointmentByBookingReference({
        BookingReference,
        LastName,
        DateOfBirth
    });
    if (result.success) {
        const appointment = result.data;
        if (appointment.UserId) {
            return res.status(400).json('The appointment is linked to a user, please login to reschedule');
        }
        const rescheduleResult = await AppointmentService.rescheduleAppointment({
            appointmentId: appointment.Id,
            newScheduleId: ScheduleId
        });
        if (rescheduleResult.success) {
            return res.status(200).json(rescheduleResult.data);
        }
    }
    return res.status(500).json(rescheduleResult.message);
}));

/**
 * @openapi
 * /public/appointments/cancel:
 *   post:
 *     summary: Cancel an existing appointment
 *     description: Cancel an existing appointment
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
 *               LastName:
 *                 type: string
 *               DateOfBirth:
 *                 type: string
 *                 format: date
 *     responses:
 *       '200':
 *         description: Appointment cancelled successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.post('/cancel', asyncHandler(async (req, res) => {
    const { BookingReference, LastName, DateOfBirth } = req.body;
    const result = await AppointmentService.getAppointmentByBookingReference({
        BookingReference,
        LastName,
        DateOfBirth
    });
    if (result.success) {
        if (result.data.UserId) {
            return res.status(400).json('The appointment is linked to a user, please login to cancel');
        }
        const cancelResult = await AppointmentService.cancelAppointment(result.data);
        if (cancelResult.success) {
            return res.status(200).json(cancelResult.data);
        }
    }
    return res.status(500).json(cancelResult.message);
}));

export default router;