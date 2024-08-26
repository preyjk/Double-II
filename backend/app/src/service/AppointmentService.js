import Appointment, { BookingReferenceIndex } from '../dal/Appointment.js';
import WorkingSchedule from '../dal/WorkingSchedule.js';
import WorkingScheduleService from './WorkingScheduleService.js';
import retry from './util/retry.js';
import { customAlphabet } from 'nanoid';
import { dynamo, TransactionBuilder } from '../dal/DynamoDB.js';

const nano = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 8);

class AppointmentService {
  static async listAppointments({ doctorId, userId, appointmentStartDate, appointmentEndDate }) {
    const data = await dynamo.send(Appointment.query({ doctorId, userId, appointmentStartDate, appointmentEndDate }));
    return { success: true, data: data.Items };
  }

  static async createAppointment(appointmentData) {
    const { ScheduleId } = appointmentData;
    const workingSchedule = await WorkingScheduleService.getScheduleById(ScheduleId);
    if (workingSchedule.data?.Status == 'available') {
      return await retry(async () => {
        const txBuilder = new TransactionBuilder();
        const updateScheduleCommand = WorkingSchedule.findByIdAndUpdate({ Id: ScheduleId, Status: 'occupied' });
        updateScheduleCommand.input.ConditionExpression = '#Status = :available';
        updateScheduleCommand.input.ExpressionAttributeValues[':available'] = 'available';

        const { Id: WorkingScheduleId, ...scheduleData } = workingSchedule.data;
        const putAppointmentCommand = Appointment.create({
          ScheduleId: WorkingScheduleId,
          BookingReference: nano(),
          ...scheduleData,
          ...appointmentData,
          Status: 'pending'
        });

        const { BookingReference, LastName, DateOfBirth, Id: AppointmentId } = putAppointmentCommand.input.Item;

        await txBuilder
          .add(updateScheduleCommand)
          .add(putAppointmentCommand)
          .add(BookingReferenceIndex.create({ BookingReference, LastName, DateOfBirth, AppointmentId }))
          .execute();
        return { success: true, data: putAppointmentCommand.input.Item };
      });
    }
    return { success: false, message: 'Not available' };
  }

  static async getAppointmentById(appointmentId) {
    const result = await dynamo.send(Appointment.findById(appointmentId));
    if (result.Item) {
      return { success: true, data: result.Item };
    } else {
      return { success: false, message: 'Appointment not found' };
    }
  }

  static async updateAppointment(appointmentData) {
    const updatedAppointment = await dynamo.send(Appointment.findByIdAndUpdate(appointmentData));
    return { success: true, data: updatedAppointment.Attributes };
  }

  static async deleteAppointment(appointmentId) {
    const result = await dynamo.send(Appointment.findById(appointmentId));
    if (!result.Item) {
      return { success: false, message: 'Appointment not found' };
    }
    const txBuilder = new TransactionBuilder();
    const { ScheduleId, BookingReference, LastName, DateOfBirth } = result.Item;
    const updateScheduleCommand = WorkingSchedule.findByIdAndUpdate({ Id: ScheduleId, Status: 'available' });
    const deleteAppointmentCommand = Appointment.findByIdAndDelete(appointmentId);
    const bookingReferenceId = BookingReferenceIndex.generateId({ BookingReference, LastName, DateOfBirth });
    const deleteBookingReferenceIndexCommand = BookingReferenceIndex.findByIdAndDelete(bookingReferenceId);
    await txBuilder
      .add(updateScheduleCommand)
      .add(deleteAppointmentCommand)
      .add(deleteBookingReferenceIndexCommand)
      .execute();
    return { success: true, message: 'Appointment deleted successfully' };
  }

  static async getAppointmentByBookingReference({ BookingReference, LastName, DateOfBirth }) {
    const bookingReferenceId = BookingReferenceIndex.generateId({ BookingReference, LastName, DateOfBirth });
    const bookingReferenceIndex = await dynamo.send(BookingReferenceIndex.findById(bookingReferenceId));
    const result = await dynamo.send(Appointment.findById(bookingReferenceIndex.Item.AppointmentId));
    if (result.Item) {
      return { success: true, data: result.Item };
    } else {
      return { success: false, message: 'Appointment not found' };
    }
  }

}

export default AppointmentService;
