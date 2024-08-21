import Appointment from '../dal/Appointment.js';
import WorkingScheduleService from './WorkingScheduleService.js';

class AppointmentService {
  static async listAppointments({ doctorId, userId, appointmentStartDate, appointmentEndDate }) {
    const data = await Appointment.query({ doctorId, userId, appointmentStartDate, appointmentEndDate});
    return { success: true, data: data.Items };
  }

  static async createAppointment(appointmentData) {
    const { ScheduleId } = appointmentData;
    const workingSchedule = await WorkingScheduleService.getScheduleById(ScheduleId);
    if (workingSchedule.data?.Status == 'available') {
      await WorkingScheduleService.updateSchedule({Id: ScheduleId, Status: 'occupied'})
      const {Id: WorkingScheduleId, ...scheduleData} = workingSchedule.data;
      const newAppointment = await Appointment.create({
        ScheduleId: WorkingScheduleId,
        ...scheduleData,
        ...appointmentData
      });
      return { success: true, data: newAppointment };
    }
    return { success: false, message: 'Not available' };
  }

  static async getAppointmentById(appointmentId) {
    const result = await Appointment.findById(appointmentId);
    if (result.Item) {
      return { success: true, data: result.Item };
    } else {
      return { success: false, message: 'Appointment not found' };
    }
  }

  static async updateAppointment(appointmentData) {
    const updatedAppointment = await Appointment.findByIdAndUpdate(appointmentData);
    return { success: true, data: updatedAppointment.Attributes };
  }

  static async deleteAppointment(appointmentId) {
    await Appointment.findByIdAndDelete(appointmentId);
    return { success: true, message: 'Appointment deleted successfully' };
  }

}

export default AppointmentService;
