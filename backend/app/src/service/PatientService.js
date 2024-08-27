import Patient from '../dal/Patient.js';
import { dynamo } from '../dal/DynamoDB.js';

class PatientService {
  static async listPatients() {
    const data = await dynamo.send(Patient.list());
    return { success: true, data: data.Items };
  }

  static async createPatient(patientData) {
    const putCommand = Patient.create(patientData);
    await dynamo.send(putCommand);
    return { success: true, data: putCommand.input.Item };
  }

  static async getPatientById(patientId) {
    const result = await dynamo.send(Patient.findById(patientId));
    if (result.Item) {
      return { success: true, data: result.Item };
    } else {
      return { success: false, message: 'Patient not found' };
    }
  }

  static async updatePatient(patientData) {
    const updatedPatient = await dynamo.send(Patient.findByIdAndUpdate(patientData));
    return { success: true, data: updatedPatient.Attributes };
  }

  static async deletePatient(patientId) {
    await dynamo.send(Patient.findByIdAndDelete(patientId));
    return { success: true, message: 'Patient deleted successfully' };
  }

  static async getPatientByUserId(userId) {
    const result = await dynamo.send(Patient.findByUserId(userId));
    return { success: true, data: result.Items };
  }
}

export default PatientService;
