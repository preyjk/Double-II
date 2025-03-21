import Appointment, { BookingReferenceIndex } from '../dal/Appointment.js';
import WorkingSchedule from '../dal/WorkingSchedule.js';
import WorkingScheduleService from './WorkingScheduleService.js';
import retry from './util/retry.js';
import { customAlphabet } from 'nanoid';
import { dynamo, TransactionBuilder } from '../dal/DynamoDB.js';
import { NotFoundError } from '../exception/Exceptions.js';

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
        const updateScheduleCommand = WorkingSchedule.findByIdAndUpdate({
          Id: ScheduleId, Status: 'occupied', Version: workingSchedule.data.Version
        });
        updateScheduleCommand.input.ConditionExpression += ' AND #Status = :available';
        updateScheduleCommand.input.ExpressionAttributeValues[':available'] = 'available';

        const { Id: WorkingScheduleId, Status, Version, ...scheduleData } = workingSchedule.data;
        const putAppointmentCommand = Appointment.create({
          ScheduleId: WorkingScheduleId,
          BookingReference: nano(),
          ...scheduleData,
          ...appointmentData,
          Status: 'active'
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

  static async rescheduleAppointment({ appointmentId, newScheduleId }) {
    const appointment = await dynamo.send(Appointment.findById(appointmentId));
    if (!appointment.Item) {
      return { success: false, message: 'Appointment not found' };
    }
    const workingSchedule = await WorkingScheduleService.getScheduleById(newScheduleId);
    if (workingSchedule.data?.Status == 'available') {
      const oldScheduleId = appointment.Item.ScheduleId;
      const oldSchedule = await WorkingScheduleService.getScheduleById(oldScheduleId);
      const updateOldScheduleCommand = WorkingSchedule.findByIdAndUpdate({
        Id: oldScheduleId, Status: 'available', Version: oldSchedule.data.Version
      });
      const { Id: WorkingScheduleId, Status, Version, ...scheduleData } = workingSchedule.data;
      const updateScheduleCommand = WorkingSchedule.findByIdAndUpdate({
        Id: newScheduleId, Status: 'occupied', Version: workingSchedule.data.Version
      });
      updateScheduleCommand.input.ConditionExpression += ' AND #Status = :available';
      updateScheduleCommand.input.ExpressionAttributeValues[':available'] = 'available';

      const updateAppointmentCommand = Appointment.findByIdAndUpdate({
        Id: appointmentId, ScheduleId: newScheduleId, Version: appointment.Item.Version, ...scheduleData
      });
      const txBuilder = new TransactionBuilder();
      await txBuilder
        .add(updateOldScheduleCommand)
        .add(updateScheduleCommand)
        .add(updateAppointmentCommand)
        .execute();
      return { success: true, data: (await dynamo.send(Appointment.findById(appointmentId))).Item };
    }
    return { success: false, message: 'Not available' };
  }

  static async updateAppointment(appointmentData) {
    const updatedAppointment = await dynamo.send(Appointment.findByIdAndUpdate(appointmentData));
    return { success: true, data: ((await dynamo.send(Appointment.findById(appointmentData.Id))).Item) };
  }

  static async deleteAppointment(appointmentId) {
    const result = await dynamo.send(Appointment.findById(appointmentId));
    if (!result.Item) {
      throw new NotFoundError('Appointment not found');
    }
    const workingSchedule = await WorkingScheduleService.getScheduleById(result.Item.ScheduleId);
    const txBuilder = new TransactionBuilder();
    const { ScheduleId, BookingReference, LastName, DateOfBirth } = result.Item;
    const updateScheduleCommand = WorkingSchedule.findByIdAndUpdate({
      Id: ScheduleId, Status: 'available', Version: workingSchedule.data.Version
    });
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
    if (!bookingReferenceIndex.Item) {
      return { success: false, message: 'Booking reference not found' };
    }
    const result = await dynamo.send(Appointment.findById(bookingReferenceIndex.Item.AppointmentId));
    if (result.Item) {
      return { success: true, data: result.Item };
    } else {
      return { success: false, message: 'Appointment not found' };
    }
  }

  static async cancelAppointment(appointment) {
    const workingSchedule = await WorkingScheduleService.getScheduleById(appointment.ScheduleId);
    const txBuilder = new TransactionBuilder();
    const { ScheduleId } = appointment;
    const updateScheduleCommand = WorkingSchedule.findByIdAndUpdate({
      Id: ScheduleId, Status: 'available', Version: workingSchedule.data.Version
    });
    const updateAppointmentCommand = Appointment.findByIdAndUpdate({
      Id: appointment.Id, Status: 'cancelled', Version: appointment.Version
    });
    await txBuilder
      .add(updateScheduleCommand)
      .add(updateAppointmentCommand)
      .execute();
    return { success: true, data: (await dynamo.send(Appointment.findById(appointment.Id))).Item };
  }

  static async completeAppointment(appointment) {
    const {Id, Version} = appointment;
    const updateAppointmentCommand = Appointment.findByIdAndUpdate({
      Id, Version, Status: 'completed'
    });
    await dynamo.send(updateAppointmentCommand);
    return { success: true, data: (await dynamo.send(Appointment.findById(Id))).Item };
  }

}

export default AppointmentService;
