import express from 'express';
import asyncHandler from '../asyncHandler.js';
import AppointmentService from '../../service/AppointmentService.js';

const router = express.Router();

/**
 * @openapi
 * /admin/appointments:
 *   get:
 *     summary: Get a list of appointments
 *     description: Get a list of appointments
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
 * /admin/appointments/{appointmentId}:
 *   delete:
 *     summary: Delete an appointment by ID
 *     description: Delete an appointment by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the appointment to delete
 *     responses:
 *       '204':
 *          description: Appointment deleted successfully
 *       '500':
 *          description: Internal server error
 */
router.delete('/:appointmentId', asyncHandler(async (req, res) => {
    const result = await AppointmentService.deleteAppointment(req.params.appointmentId);
    if (result.success) {
        res.status(204).json(result.message);
    } else {
        res.status(500).json('Internal server error');
    }
}));

/**
 * @openapi
 * /admin/appointments/{appointmentId}/complete:
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
 *       '500':
 *          description: Internal server error
 */
router.post('/:appointmentId/complete', asyncHandler(async (req, res) => {
    const appointment = await AppointmentService.getAppointmentById(req.params.appointmentId);
    if (!appointment.success) {
        return res.status(404).json(appointment.message);
    }
    const result = await AppointmentService.completeAppointment(appointment.data);
    if (result.success) {
        return res.status(200).json(result.data);
    }
    return res.status(500).json(result.message);
}));

export default router;
