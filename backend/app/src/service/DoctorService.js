import Doctor from '../dal/Doctor.js';

class DoctorService {
  static async listDoctors() {
    const data = await Doctor.list();
    return { success: true, data: data.Items };
  }

  static async createDoctor(doctorData) {
    const newDoctor = await Doctor.create(doctorData);
    return { success: true, data: newDoctor };
  }

  static async getDoctorById(doctorId) {
    const result = await Doctor.findById(doctorId);
    if (result.Item) {
      return { success: true, data: result.Item };
    } else {
      return { success: false, message: 'Doctor not found' };
    }
  }

  static async updateDoctor(doctorData) {
    const updatedDoctor = await Doctor.findByIdAndUpdate(doctorData);
    return { success: true, data: updatedDoctor.Attributes };
  }

  static async deleteDoctor(doctorId) {
    await Doctor.findByIdAndDelete(doctorId);
    return { success: true, message: 'Doctor deleted successfully' };
  }

  static async listDoctorsByWorkplace(workplace) {
    const result = await Doctor.findByProperty('WorkofPlace', workplace);
    if (result.Items) {
      return { success: true, data: result.Items };
    } else {
      return { success: false, message: 'No doctors found for the specified workplace' };
    }
  }
}

export default DoctorService;
