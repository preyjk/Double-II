import Appointment from '../dal/Appointment.js';

class AppointmentService {
  static async listAppointments() {
    const data = await Appointment.list();
    return { success: true, data: data.Items };
  }

  static async createAppointment(appointmentData) {
    const newAppointment = await Appointment.create(appointmentData);
    return { success: true, data: newAppointment };
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
