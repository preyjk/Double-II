import Doctor from '../dal/Doctor.js';
import { dynamo } from '../dal/DynamoDB.js';

class DoctorService {
  static async listDoctors(params) {
    const data = await dynamo.send(Doctor.query(params));
    return { success: true, data: data.Items };
  }

  static async createDoctor(doctorData) {
    const putCommand = Doctor.create(doctorData);
    await dynamo.send(putCommand);
    return { success: true, data: putCommand.input.Item };
  }

  static async getDoctorById(doctorId) {
    const result = await dynamo.send(Doctor.findById(doctorId));
    if (result.Item) {
      return { success: true, data: result.Item };
    } else {
      return { success: false, message: 'Doctor not found' };
    }
  }

  static async updateDoctor(doctorData) {
    const updatedDoctor = await dynamo.send(Doctor.findByIdAndUpdate(doctorData));
    return { success: true, data: updatedDoctor.Attributes };
  }

  static async deleteDoctor(doctorId) {
    await dynamo.send(Doctor.findByIdAndDelete(doctorId));
    return { success: true, message: 'Doctor deleted successfully' };
  }

}

export default DoctorService;
